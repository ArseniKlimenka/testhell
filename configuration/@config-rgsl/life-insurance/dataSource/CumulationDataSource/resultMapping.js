'use strict';

const { translationUtils } = require('@adinsure/runtime');

module.exports = function resultMapping(input) {

    const yes = 'Да';
    const no = 'Нет';

    const preparedInput = input.map(input => {
        return {
            riskGroupCode: input.RISK_GROUP_CODE,
            riskGroupDescription: input.RISK_GROUP_CODE_DESCRIPTION,
            documentNumber: input.DOCUMENT_NUMBER,
            documentState: input.DOCUMENT_STATE_CODE,
            documentStateDescription: translationUtils.getTranslation(`document/${input.DOCUMENT_CONF_CODE}/1`, 'states', null, input.DOCUMENT_STATE_CODE),
            documentRiskCode: input.RISK_CODE,
            documentRiskDescription: input.SHORT_DESCRIPTION,
            documentCurrencyCode: input.CURRENCY_CODE,
            documentRiskInsuredSum: input.RISK_INSURED_SUM,
            documentConfCode: input.DOCUMENT_CONF_CODE,
            documentConfCodeDescription: translationUtils.getTranslation(`document/${input.DOCUMENT_CONF_CODE}/1`, 'rootConfiguration', 'Title', input.DOCUMENT_CONF_CODE),
            cumulationInsuredSum: input.CUMULATION_INSURED_SUM,
            amountFrom: input.AMOUNT_FROM,
            amountTo: input.AMOUNT_TO,
            amountDescription: input.AMOUNT_DESCRIPTION,
            isLimitExceeded: input.IS_LIMIT_EXCEEDED,
            isLimitExceededDescription: input.IS_LIMIT_EXCEEDED ? yes : no,
            triggerCode: input.TRIGGER_CODE,
            partyCode: input.PARTY_CODE,
            partyType: input.PARTY_TYPE,
            partyAge: input.PARTY_AGE,
            partyFullName: input.PARTY_FULL_NAME,
            cumulationRuleId: input.CUMULATION_RULE_ID
        };
    });

    const cumulationByRiskGroupCode = preparedInput.reduce((acc, obj) => {

        if (!acc[obj.riskGroupCode]) {

            acc[obj.riskGroupCode] = [];
        }

        acc[obj.riskGroupCode].push(obj);

        return acc;
    }, {});

    const cumulationByRiskGroupCodeArray = Object.entries(cumulationByRiskGroupCode).map(([riskGroupCode, documents]) => ({
        riskGroupCode,
        documents
    }));

    cumulationByRiskGroupCodeArray.forEach(c => {
        const cumulationData = preparedInput.filter(i => i.riskGroupCode == c.riskGroupCode)[0];
        c.cumulationInsuredSum = cumulationData?.cumulationInsuredSum;
        c.riskGroupDescription = cumulationData?.riskGroupDescription;
        c.amountDescription = cumulationData?.amountDescription;
        c.isLimitExceededDescription = cumulationData?.isLimitExceededDescription;
        c.partyCode = cumulationData?.partyCode;
        c.partyFullName = cumulationData?.partyFullName;
    });

    return cumulationByRiskGroupCodeArray;
};
