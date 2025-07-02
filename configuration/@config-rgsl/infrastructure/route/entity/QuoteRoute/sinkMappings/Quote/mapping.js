'use strict';

const { getContractSat, getContractRisksSat, getBeneficiarySat,
    getInvestmentSat, getCreatedFromPolicySat, getAssetSat } = require('@config-rgsl/infrastructure/lib/SinkMappingHelperContract');

module.exports = function mapping({
    id,
    number,
    state,
    body,
    commonBody,
    originalDocumentNumber,
    sequenceNumber,
    versionState
}) {

    return {
        'PAS_IMPL.QUOTE_HUB': [{
            CONTRACT_NUMBER: originalDocumentNumber
        }],

        'PAS_IMPL.QUOTE_SAT': getContractSat({
            stateCode: state,
            body,
            originalDocumentNumber
        }),

        'PAS_IMPL.QUOTE_RISKS_SAT': getContractRisksSat({
            id,
            number,
            state,
            body,
            commonBody,
            originalDocumentNumber,
            sequenceNumber,
            versionState
        }),

        'PAS_IMPL.QUOTE_BENEFICIARY_SAT': getBeneficiarySat({
            body,
            originalDocumentNumber
        }),

        'PAS_IMPL.QUOTE_INVESTMENT_SAT': getInvestmentSat({
            body,
            originalDocumentNumber
        }),

        'PAS_IMPL.CF_QUOTE_SAT': getCreatedFromPolicySat({
            body,
            originalDocumentNumber
        }),
        'PAS_IMPL.QUOTE_ASSET_SAT': getAssetSat({
            body,
            number: number
        }),
    };

};
