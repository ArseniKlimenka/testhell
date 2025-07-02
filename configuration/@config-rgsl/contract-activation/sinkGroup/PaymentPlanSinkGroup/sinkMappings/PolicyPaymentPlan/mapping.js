'use strict';

const lifeInsuranceConstants = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');

const { reduceGroupBy, compareByObjectProperties } = require('@config-rgsl/infrastructure/lib/ArrayUtilsImpl');
const { round } = require('@config-system/infrastructure/lib/RoundingUtils');
const dateUtils = require('@config-rgsl/infrastructure/lib/DateTimeUtils');
const { deepCopy } = require('@config-rgsl/infrastructure/lib/ObjectUtils');
const { getMainRiskCode } = require('@config-rgsl/life-insurance/lib/lifeInsuranceHelper');
const { sportProducts } = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');


module.exports = function policyPaymentPlanDataSink(input, sinkExchange) {

    const lastPolicies = sinkExchange.resolveContext('lastPolicies');
    const lastPaymentPlanData = sinkExchange.resolveContext('ppData');
    const policy = lastPolicies[0];
    const lppData = lastPaymentPlanData.filter(_ => _.contractNumber === policy.contractNumber);

    const objectCode = policy.snapshotBody.policyHolder?.partyData?.partyCode;
    if (!objectCode) { throw new Error('Object code not found!'); }

    const dimensions = policy.dimensions || {};
    const paymentPlan = preparePaymentPlan(policy, lppData, dimensions, policy.contractNumber, objectCode);

    // Временно отключил проверку для коллективных договоров, надо будет сделать при настройке бухгалтерского учёта
    const isCollectivePolicy = policy.configurationCodeName == lifeInsuranceConstants.productCode.CollectiveLifeInsurancePolicy;

    if (paymentPlan && !isCollectivePolicy) {
        validatePaymentPlan(policy, paymentPlan, dimensions);
    }

    const paymentPlanItems = reduceGroupBy(
        paymentPlan,
        [
            'contractNumber',
            'dueDate',
            'itemNo',
            'postingDate',
            'deadlineDate',
            'objectCode',
            'currencyCode',
        ],
        undefined,
        (p, c) => ({
            amount: p.amount + c.amount,
        }),
        {
            amount: 0,
        }
    ).sort(compareByObjectProperties(['dueDate', 'itemNo']));

    if (paymentPlanItems.length === 0) {
        throw new Error('Not found items for payment plan');
    }

    const sat = paymentPlanItems;
    const lnk = reduceGroupBy(sat, ['contractNumber', 'dueDate']);
    const firstInstlalmentDueDate = dateUtils.getMinOfDates(sat.map(i => i.dueDate));

    const paymentPlanResult = {
        'PAS_IMPL.P_PAYMENT_PLAN_LINK': lnk
            .map(i => ({
                CONTRACT_NUMBER: i.contractNumber,
                DUE_DATE: i.dueDate,
            })),
        'PAS_IMPL.P_PAYMENT_PLAN_SAT': sat
            .map(i => ({
                CONTRACT_NUMBER: i.contractNumber,
                DUE_DATE: i.dueDate,
                ITEM_NO: i.itemNo,
                POSTING_DATE: i.postingDate,
                DEADLINE_DATE: i.deadlineDate,
                OBJECT_CODE: i.objectCode,
                AMOUNT: round(i.amount, 2),
                CURRENCY_CODE: i.currencyCode,
                AMENDMENT_NUMBER: policy.amendmentContractNumber,
                IS_FIRST_INSTALLMENT: dateUtils.isEqual(i.dueDate, firstInstlalmentDueDate),
                INSURANCE_YEAR: dateUtils.getYearDifference(firstInstlalmentDueDate, i.dueDate) + 1,
            })),
    };

    return paymentPlanResult;
};

function preparePaymentPlan(policy, lppData, dimensions, contractNumber, objectCode) {

    const paymentPlan = GeneratePaymentPlanItems(policy.snapshotBody, contractNumber, objectCode);

    if (paymentPlan.length === 0) { throw new Error('Payment plan is missing'); }

    // direct cancelling from the main policy page. In case it has a Technical amendment.
    if (dimensions.amendmentType === 'Technical' && policy.amendmentContractState === 'CancelledByAmendment') {
        const amendmentDate = policy.snapshotBody.amendmentData.technicalAmendmentData.amendmentDate;
        paymentPlan.forEach(ppi => {
            if (ppi.dueDate >= amendmentDate) {
                ppi.amount = 0;
            }
        });
    }

    // For the policy full annulment set amount to zero
    const isFullAnnulment = policy.contractState === 'Cancelled';
    if (isFullAnnulment) {
        paymentPlan.forEach(ppi => {
            ppi.amount = 0;
        });
    }

    // for policy cancellation amendment
    if (dimensions.contractType === 'Amendment' && dimensions.amendmentType === 'Cancellation') {
        const validFrom = policy.snapshotBody.amendmentData.basicAmendmentConditions.validFrom;

        for (const ppi of paymentPlan) {
            const lppi = lppData.find(i => i.itemNo === ppi.itemNo && i.dueDate === ppi.dueDate && i.objectCode === ppi.objectCode);

            if (ppi.dueDate >= validFrom || lppi.openAmount !== 0) {
                ppi.amount = 0;
            }
        }
    }

    // Handle cancelling/rescheduled records
    // If there is not counterpart item in the old paymentPlan (item rescheduled to different due dates) it should be added with 0 amounts
    lppData.forEach(item => {
        const hasCounterpart = paymentPlan.find(i => i.itemNo === item.itemNo && i.dueDate === item.dueDate && i.objectCode === item.objectCode);
        if (!hasCounterpart) {
            const ppItem = {
                contractNumber: policy.contractNumber,
                dueDate: item.dueDate,
                postingDate: item.dueDate,
                deadlineDate: item.dueDate,
                itemNo: item.itemNo,
                objectCode: item.objectCode,
                amount: 0,
                currencyCode: policy.snapshotBody.basicConditions.currency.currencyCode,
            };
            paymentPlan.push(ppItem);
        }
    });
    return paymentPlan;
}

function GeneratePaymentPlanItems(body, contractNumber, objectCode) {

    const paymentPlan = [];
    const risks = body.risks;

    if (risks.some(_ => _.risk.isLife === undefined)) {
        throw 'isLife attribute is missing from the risk';
    }

    const productCode = body.mainInsuranceConditions?.insuranceProduct?.productCode;
    const mainRiskCode = getMainRiskCode(productCode);

    for (const installment of body.paymentPlan) {
        let risksInInstallment = deepCopy(risks);

        // todo: fix
        // для НС даты начала действия рисков могут быть != датам графика выплат
        const nsProductCode = body.mainInsuranceConditions?.insuranceProduct?.productCode;
        if (!sportProducts.includes(nsProductCode)) {
            risksInInstallment = risksInInstallment.filter(_ => installment.paymentPeriodStart >= _.startDate && installment.paymentPeriodEnd <= _.endDate);
        }

        const risksInInstallmentSum = round(risksInInstallment.reduce((acc, v) => { acc += v.riskPremium; return acc; }, 0), 2);

        if (risksInInstallmentSum != installment.paymentSum) {

            // distribute risk premiums proportionally
            risksInInstallment.forEach(risk => {
                risk.riskPremium = round(risk.riskPremium * installment.paymentSum / risksInInstallmentSum, 2);
            });

            // rounding correction for main risk or risk with max premium
            let riskForRounding = mainRiskCode;

            if (!riskForRounding || !risksInInstallment.find(risk => risk.risk.riskCode === riskForRounding)) {

                let maxRiskPremium = 0;
                for (const risk of risksInInstallment) {
                    if (risk.riskPremium > maxRiskPremium || maxRiskPremium === 0) {
                        riskForRounding = risk.risk.riskCode;
                        maxRiskPremium = risk.riskPremium;
                    }
                }
            }

            const risksInInstallmentSumAfter = round(risksInInstallment.reduce((acc, v) => {
                acc += v.risk.riskCode == riskForRounding ? 0 : v.riskPremium;
                return acc;
            }, 0), 2);

            risksInInstallment.find(risk => risk.risk.riskCode == riskForRounding).riskPremium = round(installment.paymentSum - risksInInstallmentSumAfter, 2);
        }

        for (const risk of risksInInstallment) {
            paymentPlan.push(createPaymentPlanItem(body, installment, risk, contractNumber, objectCode));
        }
    }

    return paymentPlan;
}

function createPaymentPlanItem(body, installment, risk, contractNumber, objectCode) {

    const ppItem = {
        contractNumber: contractNumber,
        dueDate: installment.paymentPeriodStart,
        postingDate: undefined,
        deadlineDate: installment.paymentGraceDateProlongation ?? installment.paymentGraceDate,
        itemNo: risk.risk.riskCode,
        objectCode: objectCode,
        amount: risk.riskPremium,
        currencyCode: installment.currency,
    };

    if (risk.risk.isLife) {

        ppItem.postingDate = installment.paymentPeriodStart;
    }
    else {

        const diff = dateUtils.getYearDifference(body.policyTerms.startDate, installment.paymentPeriodStart);
        ppItem.postingDate = dateUtils.addYears(body.policyTerms.startDate, diff);
    }

    return ppItem;
}

function validatePaymentPlan(policy, paymentPlan, dimensions) {

    const body = policy.snapshotBody;
    const cancelling = policy.contractState === 'Cancelled'; // Must be have zero amount for each installments
    // there must be no negative amounts
    if (paymentPlan.some(pp => pp.amount < 0)) {
        throw 'Payment plan must have only positive installments';
    }

    let dueDates = [...body.paymentPlan.map(_ => _.paymentPeriodStart), ...paymentPlan.map(_ => _.dueDate)];
    dueDates = [...new Set(dueDates)];

    // sum of payment plan items (risks) for one installment must be the same as original installment amount.
    for (const dueDate of dueDates) {
        const paymentPlanItems = body.paymentPlan.filter(pp => pp.paymentPeriodStart === dueDate);
        if (paymentPlanItems.length > 1) {
            throw 'More than one PP on a dueDate (' + dueDate + ')';
        }
        const installmentAmount = round(paymentPlan.filter(_ => _.dueDate === dueDate).reduce((p, c) => p + c.amount, 0), 2);
        if (installmentAmount === 0 && ['Cancellation', 'Technical'].includes(dimensions.amendmentType)) {
            continue;
        }

        const inputPpi = paymentPlanItems[0];
        const inputPpiAmount = inputPpi?.paymentSum ?? 0;
        const expectedAmount = cancelling ? 0 : inputPpiAmount;
        if (expectedAmount !== installmentAmount) {
            throw 'Generated installment amount is not equal to the payment plan installment amount! (' + dueDate + ', input=' + inputPpiAmount + ', output=' + installmentAmount + ')';
        }
    }
}
