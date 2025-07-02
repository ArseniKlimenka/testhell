'use strict';

module.exports = function resultMapping(input) {

    return {
        contractNumber: input.CONTRACT_NUMBER,
        configurationCodeName: input.CONTRACT_CONF_CODE_NAME,
        productCode: input.PRODUCT_CODE,
        currencyCode: input.CURRENCY_CODE,
        contractEndDate: input.CONTRACT_END_DATE,
        riskGroupCode: input.RISK_GROUP_CODE,
        riskCode: input.RISK_CODE,
        riskStartDate: input.RISK_START_DATE,
        riskEndDate: input.RISK_END_DATE,
        riskPremium: +input.RISK_PREMIUM,
        riskInsuredSum: +input.RISK_INSURED_SUM,
        riskInsuredSumWithoutCashBack: +input.RISK_INSURED_SUM_WITHOUT_CASHBACK,
        riskPerson: input.RISK_PERSON,
        riskPeriodInsuredSum: +input.RISK_PERIOD_INSURED_SUM,
        riskPeriodStartDate: input.RISK_PERIOD_START_DATE,
        riskPeriodEndDate: input.RISK_PERIOD_END_DATE,
        partyCode: input.PARTY_CODE
    };
};
