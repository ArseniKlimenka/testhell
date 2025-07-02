'use strict';

const { startCumulation } = require('@config-rgsl/life-insurance/lib/cumulationHelper');
const { getArrayOfUniqueObjects } = require('@config-rgsl/infrastructure/lib/ArrayUtilsImpl');

module.exports = function mapping(input, sinkExchange) {

    startCumulation(input, sinkExchange);

    const cumulation = sinkExchange.cumulation;
    const triggersGroup = cumulation?.triggersGroup ?? [];

    let cumulationSat = [];

    triggersGroup.forEach(tg => {
        cumulationSat.push({
            CUMULATION_NUMBER: input.documentNumber,
            CUMULATION_RULE_ID: tg.id,
            RISK_GROUP_CODE: tg.riskGroupCode,
            CUMULATION_INSURED_SUM: tg.riskGroupInsuredSumFixRate,
            AGE_CODE: tg.ageCode,
            LIMIT_AMOUNT_CODE: tg.amountCode,
            ACTIVE_CODE: tg.activeCode,
            TRIGGER_CODE: tg.triggerCode,
            IS_LIMIT_EXCEEDED: tg.isLimitExceeded,
            PARTY_CODE: tg.partyCode,
            PARTY_TYPE: tg.partyType,
            PARTY_AGE: tg.partyAge,
            CHECK_DATE_TIME: cumulation.checkDateTime
        });
    });

    cumulationSat = getArrayOfUniqueObjects(cumulationSat);


    let cumulationDocumentsSat = [];

    triggersGroup.forEach(tg => {
        tg.cumulationContracts.forEach(c => {
            cumulationDocumentsSat.push({
                CUMULATION_NUMBER: input.documentNumber,
                RISK_GROUP_CODE: tg.riskGroupCode,
                DOCUMENT_NUMBER: c.contractNumber,
                PARTY_CODE: tg.partyCode,
                CURRENCY_CODE: c.currencyCode,
                CURRENCY_RATE: c.currencyRate
            });
        });
    });

    cumulationDocumentsSat = getArrayOfUniqueObjects(cumulationDocumentsSat);

    let cumulationRisksSat = [];

    triggersGroup.forEach(tg => {
        tg.groupRisks.forEach(gr => {
            cumulationRisksSat.push({
                CUMULATION_NUMBER: input.documentNumber,
                RISK_GROUP_CODE: tg.riskGroupCode,
                DOCUMENT_NUMBER: gr.contractNumber,
                PARTY_CODE: tg.partyCode,
                RISK_CODE: gr.riskCode,
                RISK_INSURED_SUM: gr.riskInsuredSumWithoutCashBack,
                RISK_CURRENCY_CODE: gr.currencyCode
            });
        });
    });

    cumulationRisksSat = getArrayOfUniqueObjects(cumulationRisksSat);

    return {

        'PAS_IMPL.CUMULATION_HUB': [{
            CUMULATION_NUMBER: input.documentNumber
        }],

        'PAS_IMPL.CUMULATION_SAT': cumulationSat,

        "PAS_IMPL.CUMULATION_DOCUMENTS_SAT": cumulationDocumentsSat,

        "PAS_IMPL.CUMULATION_RISKS_SAT": cumulationRisksSat,

        'PAS_IMPL.CUMULATION_QUOTE_LINK': [{
            CONTRACT_NUMBER: input.documentNumber,
            CUMULATION_NUMBER: input.documentNumber,
        }]
    };

};
