'use strict';

module.exports = function resultMapping(input) {

    return {
        id: input.ID,
        productGroupCode: input.PRODUCT_GROUP_CODE,
        productCode: input.PRODUCT_CODE,
        riskGroupCode: input.RISK_GROUP_CODE,
        maxRiskCount: input.MAX_RISK_COUNT,
        maxRiskCountAlgorithm: input.MRC_ALGORITHM,
        maxRiskCountAlgorithmProductCodes: input.MRC_ALGORITHM_PRODUCT_CODES ? JSON.parse(input.MRC_ALGORITHM_PRODUCT_CODES) : [],
        riskCode: input.RISK_CODE,
        riskPerson: input.RISK_PERSON,
        ageCode: input.AGE_CODE,
        ageFrom: input.AGE_FROM,
        ageTo: input.AGE_TO,
        amountCode: input.AMOUNT_CODE,
        amountFrom: input.AMOUNT_FROM,
        amountTo: input.AMOUNT_TO,
        triggerCode: input.TRIGGER_CODE,
        triggerDescription: input.TRIGGER_DESCRIPTION,
        groupCodeDescription: input.GROUP_CODE_DESCRIPTION,
        activeCode: input.ACTIVE_CODE,
        activeFrom: input.ACTIVE_FROM,
        activeTo: input.ACTIVE_TO
    };
};
