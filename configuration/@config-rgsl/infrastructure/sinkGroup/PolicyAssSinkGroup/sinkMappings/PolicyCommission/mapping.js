'use strict';

module.exports = function mapping(input, sinkExchange) {

    const contractNumber = input.contractNumber;
    const policyData = sinkExchange.resolveContext('latestPolicyData');
    const body = policyData.snapshotBody;
    const agentAgreementNumber = body.commission?.agentAgreement?.number;
    const agentAmendmentNumber = body.commission?.agentAgreement?.amendmentNumber;
    const partnerCode = body.mainInsuranceConditions?.partner?.partnerCode;
    const commItems = body.commission?.policyCommissionItems ?? [];
    const holderObjectCode = body.policyHolder?.partyData?.partyCode;

    if (!agentAgreementNumber || !partnerCode) { return; }

    const preparedCommItems = commItems.map(item => {

        return {
            CONTRACT_NUMBER: contractNumber,
            AA_NUMBER: agentAgreementNumber,
            SERVICE_PROVIDER_CODE: partnerCode,
            OBJECT_CODE: item.insuredObjectCode ?? holderObjectCode,
            ITEM_CODE: item.policyItemCode,
            PERIOD_NUMBER: item.periodNumber,
            START_DATE: item.periodStartDate,
            END_DATE: item.periodEndDate,
            CALCULATED_RATE: item.calculatedRate,
            CALCULATED_EXPENSES_RATE: item.calculatedExpensesRate,
            CALCULATED_NP_RATE: item.calculatedNatuaralPersonRate,
            CALCULATED_SP_RATE: item.calculatedSolePropriatorRate,
            MANUAL_RATE: item.manualRate,
            MANUAL_EXPENSES_RATE: item.manualExpensesRate,
            MANUAL_NP_RATE: item.manualNatuaralPersonRate,
            MANUAL_SP_RATE: item.manualSolePropriatorRate,
            CALCULATED_AMOUNT: item.calculatedAmount,
            MANUAL_AMOUNT: item.manualAmount,
            MIN_RATE: item.minRate,
            MAX_RATE: item.maxRate,
            CALCULATION_DATE: item.calculationDate,
            AA_AMENDMENT_NUMBER: agentAmendmentNumber,
        };
    });

    preparedCommItems.push({
        CONTRACT_NUMBER: contractNumber,
        $deleted: true,
    });

    return {
        'PAS_IMPL.POLICY_COMMISSION_LINK': [{
            AA_NUMBER: agentAgreementNumber,
            SERVICE_PROVIDER_CODE: partnerCode,
            CONTRACT_NUMBER: contractNumber,
        }],

        'PAS_IMPL.POLICY_COMMISSION_SAT': preparedCommItems,
    };

};
