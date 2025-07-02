
const { LocalDate } = require('@js-joda/core');
const { deepCopy } = require('@config-rgsl/infrastructure/lib/ObjectUtils');
const { round } = require('@config-system/infrastructure/lib/RoundingUtils');
const DateTimeUtils = require('@config-rgsl/infrastructure/lib/DateTimeUtils');
const confCorp = require('@config-rgsl/life-insurance/lib/productConfigurationCorp');
const { throwResponseError } = require('@config-rgsl/infrastructure/lib/errorUtils');
const { getDayByCurrency } = require('@config-rgsl/life-insurance/lib/lifeInsuranceHelper');
const lifeInsuranceConstants = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');
const { changeAmendmentTypes } = require('@config-rgsl/life-insurance/lib/policyChangeAmendmentConsts');
const { executeCalculationService } = require('@config-rgsl/agent-agreement-base/lib/AAPolicyCommission');


/**
    * @desc Calculate payment plan and fill it in policy body
    * @param {object} body body
    */
function fillPaymentPlan(body, dimensions) {

    // get params
    const mainParams = getMainParams(body, dimensions);

    // skip for migrated
    if (mainParams.isMigrated && mainParams.amendmentType !== changeAmendmentTypes.financialChange) {

        return;
    }

    // validate params
    if (!validateMainParams(mainParams)) {

        body.paymentPlan = [];
        return;
    }

    // calc by product groups
    let result = [];

    if ([
        lifeInsuranceConstants.productGroup.NSZ.descriptionRU,
        lifeInsuranceConstants.productGroup.DSZ.descriptionRU,
        lifeInsuranceConstants.productGroup.ISZ.descriptionRU,
        lifeInsuranceConstants.productGroup.DMS.descriptionRU,
        lifeInsuranceConstants.productGroup.RISK.descriptionRU,
        lifeInsuranceConstants.productGroup.NS.descriptionRU
    ].includes(mainParams.productGroupCode)) {

        result = calcLifePaymentPlan(mainParams) ?? [];
    }
    if ([lifeInsuranceConstants.productGroup.CSZ.descriptionRU].includes(mainParams.productGroupCode)) {

        result = calcCreditPaymentPlan(mainParams) ?? [];
    }
    if (dimensions.configurationName == lifeInsuranceConstants.productCode.CollectiveLifeInsurancePolicy) {

        result = calcLifePaymentPlan(mainParams) ?? [];
    }

    // fill body
    fillBody();

    // helper functions
    function getMainParams(body, dimensions) {

        const amendmentType = dimensions?.amendmentType;
        const productConfOnAmendmentDate = body.amendmentData?.finChangeAmendmentData?.mainAttributes?.productConfOnAmendmentDate;
        let productConfDate = undefined;

        if (!productConfOnAmendmentDate) {

            productConfDate = body.basicConditions?.issueDate;
        }
        else {

            productConfDate = body.amendmentData?.finChangeAmendmentData?.mainAttributes?.amendmentIssueDate;
        }

        const productCode = body.mainInsuranceConditions?.insuranceProduct?.productCode;
        const issueDate = body.basicConditions?.issueDate;
        const startDate = body.policyTerms?.startDate;
        const endDate = body.policyTerms?.endDate;
        const paymentPeriodEndDate = body.policyTerms?.paymentPeriodEndDate;
        const paymentPeriodStartDate = body.policyTerms?.paymentPeriodStartDate;
        const paymentPeriodLastDate = body.policyTerms?.paymentPeriodLastDate;
        const currencyCode = body.basicConditions?.currency?.currencyCode;
        const paymentFrequencyCode = body.basicConditions?.paymentFrequency?.paymentFrequencyCode;
        const riskPremium = body.basicConditions?.riskPremium;
        const riskInsuredSum = body.basicConditions?.riskInsuredSum;
        const payerFullName = body.policyHolder?.partyData?.partyFullName;
        const payerPartyCode = body.policyHolder?.partyData?.partyCode;
        const payerPartyType = body.policyHolder?.partyData?.partyType;
        const isReinvest = body.basicConditions?.isReinvest ?? false;
        const risks = body.risks ?? [];
        const isCollectivePolicy = dimensions.configurationName == lifeInsuranceConstants.productCode.CollectiveLifeInsurancePolicy;
        const productConf = isCollectivePolicy ? confCorp({ productCode, issueDate: productConfDate }) : body.productConfiguration;
        const productGroupCode = productConf?.productGroupCode;
        const daysBetweenIssueAndStartDynamic = body.basicConditions?.daysBetweenIssueAndStartDynamic;
        const daysBetweenIssueAndStart = daysBetweenIssueAndStartDynamic ?? getDayByCurrency(productConf, isReinvest, currencyCode);
        let payPeriodDays = isReinvest ? productConf?.payPeriodDaysReinvest : productConf?.payPeriodDays;
        if (paymentPeriodLastDate && paymentPeriodStartDate) {
            payPeriodDays = DateTimeUtils.getDayDifference(paymentPeriodStartDate, paymentPeriodLastDate);
        }
        const gracePeriodDays = productConf?.gracePeriodDays;
        const useThreePayments = amendmentType !== changeAmendmentTypes.financialChange ? productConf?.useThreePayments : false;
        const isMigrated = productConf?.isMigrated;

        return {
            productCode,
            issueDate,
            startDate,
            endDate,
            paymentPeriodEndDate,
            paymentPeriodStartDate,
            currencyCode,
            paymentFrequencyCode,
            riskPremium,
            riskInsuredSum,
            payerFullName,
            payerPartyCode,
            payerPartyType,
            risks,
            productGroupCode,
            daysBetweenIssueAndStart,
            payPeriodDays,
            gracePeriodDays,
            useThreePayments,
            isMigrated,
            amendmentType
        };
    }

    function validateMainParams(mainParams) {

        const isMigaratedFinChange = mainParams.isMigrated && mainParams.amendmentType === changeAmendmentTypes.financialChange;

        if (!mainParams.productCode ||
            !mainParams.issueDate ||
            !mainParams.startDate ||
            !mainParams.endDate ||
            !mainParams.currencyCode ||
            !mainParams.paymentFrequencyCode ||
            (!mainParams.riskPremium && !mainParams.riskInsuredSum && !isMigaratedFinChange) ||
            mainParams.risks.length == 0 ||
            !mainParams.productGroupCode ||
            mainParams.daysBetweenIssueAndStart === undefined ||
            mainParams.payPeriodDays === undefined ||
            mainParams.gracePeriodDays === undefined ||
            mainParams.useThreePayments === undefined) {

            return false;
        }

        return true;
    }

    function getPeriodMonths(paymentFrequencyCode) {
        let result;
        switch (paymentFrequencyCode) {
            case lifeInsuranceConstants.paymentFrequency.oneTime.code:
                result = 9999; // just big number to have 1 period
                break;
            case lifeInsuranceConstants.paymentFrequency.annual.code:
                result = 12;
                break;
            case lifeInsuranceConstants.paymentFrequency.semiAnnual.code:
                result = 6;
                break;
            case lifeInsuranceConstants.paymentFrequency.quarterly.code:
                result = 3;
                break;
            case lifeInsuranceConstants.paymentFrequency.monthly.code:
                result = 1;
                break;
            default:
                break;
        }
        return result;
    }

    function calcCreditPaymentPlan(mainParams) {
        const premium = round(mainParams.risks.reduce((acc, v) => { acc += v.riskPremium; return acc; }, 0), 2);
        return [
            {
                paymentPeriodStart: mainParams.startDate,
                paymentPeriodEnd: mainParams.endDate,
                paymentExpirationDate: mainParams.startDate,
                paymentGraceDate: mainParams.startDate,
                payer: mainParams.payerFullName,
                paymentSum: premium,
                currency: mainParams.currencyCode,
                partyCode: mainParams.payerPartyCode,
                partyType: mainParams.payerPartyType,
                paymentMandatory: premium,
                insuranceYear: 1,
                isFirstInstallment: true,
            }
        ];
    }

    function calcLifePaymentPlan(mainParams) {

        const threePaymentsDays = 14;

        let result = [];
        const periodMonths = getPeriodMonths(mainParams.paymentFrequencyCode);
        let periods = DateTimeUtils.getPeriodsTableByMonths(mainParams.paymentPeriodStartDate, mainParams.paymentPeriodEndDate, periodMonths);

        if (!periods || periods.length == 0) {

            return result;
        }

        // correction due to CBR 5968
        if (mainParams.useThreePayments &&
            mainParams.paymentFrequencyCode != lifeInsuranceConstants.paymentFrequency.oneTime.code) {
            periods = periods.flatMap((item, idx) => {

                if (idx == 0) {

                    return [
                        {
                            periodStartDate: item.periodStartDate,
                            periodEndDate: DateTimeUtils.addDays(item.periodStartDate, threePaymentsDays - 1)
                        },
                        {
                            periodStartDate: DateTimeUtils.addDays(item.periodStartDate, threePaymentsDays),
                            periodEndDate: DateTimeUtils.addDays(item.periodStartDate, threePaymentsDays * 2 - 1)
                        },
                        {
                            periodStartDate: DateTimeUtils.addDays(item.periodStartDate, threePaymentsDays * 2),
                            periodEndDate: item.periodEndDate
                        }
                    ];
                }


                return [
                    {
                        periodStartDate: item.periodStartDate,
                        periodEndDate: item.periodEndDate
                    }
                ];

            });
        }

        result = periods.map((item, idx) => {

            const paymentExpirationDate = idx == 0 ?
                DateTimeUtils.addDays(item.periodStartDate, mainParams.payPeriodDays) :
                item.periodStartDate;

            const paymentGraceDate = idx == 0 ?
                DateTimeUtils.addDays(item.periodStartDate, mainParams.payPeriodDays) :
                DateTimeUtils.addDays(item.periodStartDate, mainParams.gracePeriodDays);

            let paymentSum;
            let paymentMandatory;

            if (mainParams.paymentFrequencyCode != lifeInsuranceConstants.paymentFrequency.oneTime.code) {

                paymentSum = round(mainParams.risks
                    .filter(risk => DateTimeUtils.isBeforeOrEqual(risk.startDate, item.periodStartDate) &&
                        DateTimeUtils.isAfterOrEqual(risk.endDate, item.periodEndDate))
                    .reduce((acc, v) => { acc += v.riskPremium; return acc; }, 0), 2);
                paymentMandatory = round(mainParams.risks
                    .filter(risk => DateTimeUtils.isBeforeOrEqual(risk.startDate, item.periodStartDate) &&
                        DateTimeUtils.isAfterOrEqual(risk.endDate, item.periodEndDate))
                    .filter(risk => !risk.isAdditional)
                    .reduce((acc, v) => { acc += v.riskPremium; return acc; }, 0), 2);
            }
            else {

                paymentSum = round(mainParams.risks
                    .reduce((acc, v) => { acc += v.riskPremium; return acc; }, 0), 2);
                paymentMandatory = round(mainParams.risks
                    .filter(risk => !risk.isAdditional)
                    .reduce((acc, v) => { acc += v.riskPremium; return acc; }, 0), 2);
            }

            // correction due to CBR 5968
            if (mainParams.useThreePayments &&
                mainParams.paymentFrequencyCode != lifeInsuranceConstants.paymentFrequency.oneTime.code) {

                if ([0, 1].includes(idx)) {

                    paymentSum = round(paymentSum / 3, 2);
                    paymentMandatory = round(paymentMandatory / 3, 2);
                }
                if ([2].includes(idx)) {

                    paymentSum = round(paymentSum - 2 * round(paymentSum / 3, 2), 2);
                    paymentMandatory = round(paymentMandatory - 2 * round(paymentMandatory / 3, 2), 2);
                }
            }

            const firstInstlalmentDate = DateTimeUtils.getMinOfDates(periods.map(_ => _.periodStartDate));

            return {
                paymentPeriodStart: item.periodStartDate,
                paymentPeriodEnd: item.periodEndDate,
                paymentExpirationDate: paymentExpirationDate,
                paymentGraceDate: paymentGraceDate,
                payer: mainParams.payerFullName,
                paymentSum: paymentSum,
                currency: mainParams.currencyCode,
                partyCode: mainParams.payerPartyCode,
                partyType: mainParams.payerPartyType,
                paymentMandatory: paymentMandatory,
                insuranceYear: DateTimeUtils.getYearDifference(firstInstlalmentDate, item.periodStartDate) + 1,
                isFirstInstallment: DateTimeUtils.isEqual(item.periodStartDate, firstInstlalmentDate),
            };

        });

        return result;
    }

    function fillBody() {
        const oldPaymentPlan = deepCopy(body.paymentPlan);

        body.paymentPlan = [];
        result.forEach(curr => {

            const contractType = dimensions?.contractType;
            if (contractType == 'Amendment') {
                const old = oldPaymentPlan.find(x => x.paymentPeriodStart == curr.paymentPeriodStart);
                if (old) {
                    curr.paymentGraceDateProlongation = old.paymentGraceDateProlongation;
                }
            }
            body.paymentPlan.push(curr);
        });
    }
}

/**
 * @translationKey {translationKey} fullPayedYes
 * @translationKey {translationKey} fullPayedNo
 */
async function loadPaymentPlanToGrid(input, ambientProperties, that) {

    const body = input.context.Body;

    const componentPaymentPlan = input.componentContext ?? that.view?.getContext()?.Body?.paymentPlan;
    const paymentPlan = deepCopy(componentPaymentPlan);

    if (input.context.Dimensions.contractType === 'Policy' && input.context.Number && paymentPlan != undefined) {

        if (body?.commission?.agentAgreement) {
            const serviceResponse = await executeCalculationService(input, ambientProperties);
            const commissions = serviceResponse?.calculationResult?.data?.result;

            if (commissions) {

                paymentPlan.forEach(function (item) {

                    let commission = commissions.filter(_ => _.insuranceYear === item.insuranceYear);

                    if (commission.length === 0) {
                        commission = commissions.filter(_ => _.insuranceYear === 0);
                    }
                    if (commission.length === 1) {
                        setCommission(item, commission[0].rate);
                    }
                    else {
                        setCommission(item, 0);
                    }
                });
            }
        }

        if (body.amendmentData?.portfolioMovementAmendmentData) {
            const portfolioMovementEffectiveDate = body.amendmentData.portfolioMovementAmendmentData.mainAttributes.amendmentEffectiveDate;
            const originalDocumentStartDate = body.policyTerms.startDate;
            const newCommissionStartDate = DateTimeUtils.calculateNextPolicyYearStartDate(originalDocumentStartDate, portfolioMovementEffectiveDate);
            const newCommissionRate = body.commission.policyCommissionItems[0].calculatedRate;
            const oldCommissionRate = body.oldCommission.policyCommissionItems[0].calculatedRate;

            paymentPlan.forEach(function (item) {
                if (new Date(item.paymentPeriodStart) < new Date(newCommissionStartDate)) {
                    setCommission(item, oldCommissionRate);
                }
                else {
                    setCommission(item, newCommissionRate);
                }
            });
        }

        const translate = ambientProperties.services.translate.getSync;
        const fullPayedNo = translate(ambientProperties.configurationCodeName.toUpperCase(), 'fullPayedNo');
        const fullPayedYes = translate(ambientProperties.configurationCodeName.toUpperCase(), 'fullPayedYes');
        const request = {
            method: 'post',
            url: 'api/entity-infrastructure/shared/datasource/PeriodInstallmentsDataSource',
            data: {
                data: {
                    criteria: {
                        contractNo: input.context.Number,
                    }
                }
            }
        };

        let result;
        try {
            that.view.startBlockingUI();
            result = await ambientProperties.services.api.call(request);
        }
        catch (err) {
            throwResponseError(err);
        }
        finally {
            that.view.stopBlockingUI();
        }

        let installements = [];
        if (result && result.data && result.data.length > 0) {

            installements = result.data;
        }

        const currentDate = LocalDate.now().toString();

        paymentPlan.forEach(function (item) {

            if (item.paymentPeriodStart <= currentDate) {

                const selectedInst = installements.filter(_ => _.resultData.dueDate === item.paymentPeriodStart);
                const installement = selectedInst[0]?.resultData;

                if (installement?.installmentSum !== 0) {

                    item.fullPayed = installement?.underpaymentSum === 0 ? fullPayedYes : fullPayedNo;
                    item.underpaymentSum = installement?.underpaymentSum === 0 ? undefined : installement?.underpaymentSum;

                    if (item.paymentPeriodEnd >= currentDate) {

                        item.overpaymentSum = installement?.overpaymentSum > 0 ? installement?.overpaymentSum : undefined;
                    }
                }
            }
        });
    }

    input.context.ClientViewModel.paymentPlan = paymentPlan;

    that.view.validate();
    that.view.reevaluateRules();
    that.view.rebind();

    function setCommission(item, rate) {
        item.commissionRate = rate;
        item.commissionSum = round(item.paymentSum * rate, 2);
    }
}

module.exports = {
    fillPaymentPlan,
    loadPaymentPlanToGrid,
};
