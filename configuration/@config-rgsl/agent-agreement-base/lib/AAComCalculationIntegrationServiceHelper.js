'use strict';

const dateUtils = require('@config-rgsl/infrastructure/lib/DateTimeUtils');
const { DateTimeFormatter } = require('@js-joda/core');
const { rateOfReturnSetData } = require('@config-rgsl/life-insurance/lib/productConfigurationUtils');
const { throwResponseError } = require('@config-rgsl/infrastructure/lib/errorUtils');
const { portfolioMovementAmendmentDocuments } = require('@config-rgsl/life-insurance/lib/amendmentConstants');

const executionStatuses = { // The constants are borrowed from platform
    Failed: 0,
    InProgress: 1,
    Completed: 2
};

const errorCodes = {
    NotFound: 'AA_CC_NOT_FOUND',
    NotSingleResult: 'AA_CC_NOT_SINGLE_RESULT',
    InvalidInput: 'AA_CC_INVALID_INPUT'
};

function getStringValue(result, selector, defaultValue = '') {
    return result !== undefined ? selector(result) : defaultValue;
}

function getIntegerValue(result, selector, defaultValue = 0) {
    return result !== undefined ? selector(result) : defaultValue;
}

function getBooleanValue(result, selector, defaultValue = false) {
    return result !== undefined ? selector(result) : defaultValue;
}

function generateCalculationNumber(executedAt) {
    const number = executedAt.format(DateTimeFormatter.ofPattern('ddMMyyyy/HHmmss'));
    return 'CC-' + number;
}

async function getCalcResult(input, ambientProperties) {

    const body = input?.context?.Body;
    let calculationDate = body?.policyTerms?.startDate;
    if (portfolioMovementAmendmentDocuments.includes(ambientProperties.configurationCodeName)) {
        if (body?.amendmentData?.portfolioMovementAmendmentData?.mainAttributes?.productConfOnAmendmentDate) {
            calculationDate = body?.amendmentData?.portfolioMovementAmendmentData?.mainAttributes?.amendmentIssueDate;
        }
        else {
            calculationDate = body?.amendmentData?.portfolioMovementAmendmentData?.mainAttributes?.amendmentEffectiveDate;
        }
    }

    const request = {
        method: 'post',
        url: 'api/core/shared/integration-services/CommissionCalculation/1',
        data: {
            data: {
                originDocumentId: input.context.Body.commission.agentAgreement.id,
                originDocumentNumber: input.context.Body.commission.agentAgreement.number,
                contractNumber: input.context.Number,
                serviceProviderCode: input.context.Body.mainInsuranceConditions.partner.partnerCode,
                calculationDate: calculationDate,
                loggingEnabled: true,
                calculationContext: {
                    insuranceRule: input.context.Body.insuranceRules?.ruleCode || 'NoRule',
                    insuranceProduct: input.context.Body.mainInsuranceConditions.insuranceProduct.productCode,
                    insuranceCurrency: input.context.Body.basicConditions.currency.currencyCode,
                    insuranceTerm: dateUtils.getYearDifference(input.context.Body.policyTerms.startDate, dateUtils.addDays(input.context.Body.policyTerms.endDate, 1)),
                    premiumPeriod: dateUtils.getYearDifference(input.context.Body.policyTerms.paymentPeriodStartDate, dateUtils.addDays(input.context.Body.policyTerms.paymentPeriodEndDate, 1)) || 0,
                    premiumPeriodType: input.context.Body.basicConditions.paymentFrequency.paymentFrequencyCode,
                    creditProgram: input.context.Body.creditProgram?.creditProgramId,
                    variant: input.context.Body.basicInvestmentParameters?.variant?.variantCode,
                    manualRule: input.context.Body.commission.manualRule,
                }
            }
        }
    };

    let result;
    try {
        result = await ambientProperties.services.api.call(request);
    }
    catch (err) {
        throwResponseError(err);
    }

    return result;
}

function getCommissionItems(calcResultData, body) {

    const commissionItems = [];
    let baseResult = calcResultData.result ? calcResultData.result.find(r => r.insuranceYear === 0) : undefined;

    if (!baseResult) {
        baseResult = {
            rate: 0,
            expensesRate: 0,
            natuaralPersonRate: 0,
            solePropriatorRate: 0,
            amount: 0,
            minRate: 0,
            maxRate: 0
        };
    }
    if (!body.risks) {
        return commissionItems;
    }

    for (const riskInfo of body.risks) {

        const periodStartDate = riskInfo.startDate || body.policyTerms.startDate;
        const periodEndDate = riskInfo.endDate || body.policyTerms.endDate;

        const commPeriods = dateUtils.getPeriodsTableByMonths(body.policyTerms.startDate, periodEndDate, 12);

        if (commPeriods && commPeriods.length > 0) {

            for (const period of commPeriods) {

                if (periodStartDate > period.periodStartDate) {

                    continue;
                }

                let manualRate = undefined;
                if (body.basicConditions?.isSpecialOffer && period.periodNumber == 1) {
                    manualRate = body.technicalInformation?.ratesOfReturn.find(x => x)?.manualRate;
                }

                const resultForPeriod = calcResultData.result?.find(r => r.insuranceYear === period.periodNumber) ?? baseResult;
                const riskCommission = {};
                const insuredObject = body.insuredPerson ?? body.policyHolder;
                riskCommission.policyItemCode = riskInfo.risk.riskCode;
                riskCommission.policyItemDescription = riskInfo.risk.riskShortDescription;
                riskCommission.insuredObjectCode = insuredObject?.partyData?.partyCode;
                riskCommission.insuredObjectDescription = insuredObject?.partyData?.partyFullName;
                riskCommission.periodNumber = period.periodNumber;
                riskCommission.periodStartDate = period.periodStartDate;
                riskCommission.periodEndDate = period.periodEndDate;
                riskCommission.calculatedRate = resultForPeriod.rate;
                riskCommission.manualRate = manualRate;
                riskCommission.calculatedExpensesRate = resultForPeriod.expensesRate;
                riskCommission.calculatedNatuaralPersonRate = resultForPeriod.natuaralPersonRate;
                riskCommission.calculatedSolePropriatorRate = resultForPeriod.solePropriatorRate;
                riskCommission.calculatedAmount = resultForPeriod.amount;
                riskCommission.minRate = resultForPeriod.minRate;
                riskCommission.maxRate = resultForPeriod.maxRate;
                riskCommission.calculationDate = calcResultData.calculationDate;
                commissionItems.push(riskCommission);
            }
        }
    }

    return commissionItems;
}

function setCaclResult(existingCommItems, commissionItems, amendmentNumber, body, budgetRule, budgetRuleAlgorithm, isSpecialOffer) {

    if (existingCommItems && existingCommItems.length > 0) {

        commissionItems.forEach(item => {

            const existingItem = existingCommItems.find(oldItem => oldItem.insuredObjectCode === item.insuredObjectCode && oldItem.policyItemCode === item.policyItemCode && oldItem.periodNumber === item.periodNumber);

            if (existingItem && !isSpecialOffer) {

                item.manualAmount = existingItem.manualAmount;
                item.manualExpensesRate = existingItem.manualExpensesRate;
                item.manualNatuaralPersonRate = existingItem.manualNatuaralPersonRate;
                item.manualSolePropriatorRate = existingItem.manualSolePropriatorRate;
                item.manualRate = existingItem.manualRate;
            } else if (existingItem && isSpecialOffer) {
                item.manualAmount = existingItem.manualAmount;
                item.manualExpensesRate = existingItem.manualExpensesRate;
                item.manualNatuaralPersonRate = existingItem.manualNatuaralPersonRate;
                item.manualSolePropriatorRate = existingItem.manualSolePropriatorRate;
            }
        });
    }

    body.commission.policyCommissionItems = commissionItems;
    body.commission.agentAgreement.amendmentNumber = amendmentNumber;

    if (body.basicInvestmentParameters?.rateOfReturnManualRate) {
        rateOfReturnSetData(body);
    }

    const shouldSkipBudgetRule = body.commission?.budgetRule?.isManual ?? false;

    if (!shouldSkipBudgetRule) {

        if (!body.commission.budgetRule) {

            body.commission.budgetRule = {};
        }

        const budgetRuleCode = budgetRule?.code;
        const budgetRuleName = budgetRule?.name;

        if (budgetRuleCode && budgetRuleName) {

            body.commission.budgetRule.rule = {
                code: budgetRule.code,
                description: budgetRule.name
            };
        }
        else {

            body.commission.budgetRule.rule = undefined;
        }

        const budgetAlgorithmCode = budgetRuleAlgorithm?.code;
        const budgetAlgorithmName = budgetRuleAlgorithm?.name;

        if (budgetAlgorithmCode && budgetAlgorithmName) {

            body.commission.budgetRule.algorithm = {
                code: budgetRuleAlgorithm.code,
                description: budgetRuleAlgorithm.name
            };
        }
        else {

            body.commission.budgetRule.algorithm = undefined;
        }
    }
}

module.exports = {
    executionStatuses,
    errorCodes,
    getStringValue,
    getIntegerValue,
    getBooleanValue,
    generateCalculationNumber,
    getCalcResult,
    getCommissionItems,
    setCaclResult
};
