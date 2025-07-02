'use strict';

const { getContractSat, getContractRisksSat, getBeneficiarySat, getInvestmentSat,
    getAdditionalBeneficiarySat, getCreatedFromPolicySat, getAdditionalInitiatorsSat,
    getAssetSat } = require('@config-rgsl/infrastructure/lib/SinkMappingHelperContract');

module.exports = function mapping(input, sinkExchange) {

    const contractNumber = input.contractNumber;
    const policyData = sinkExchange.resolveContext('latestPolicyData');
    const body = policyData.snapshotBody;

    return {
        'PAS_IMPL.POLICY_HUB': [{
            CONTRACT_NUMBER: contractNumber
        }],

        'PAS_IMPL.POLICY_SAT': getContractSat({
            body,
            originalDocumentNumber: contractNumber,
            stateCode: input.stateCode,
        }),

        'PAS_IMPL.POLICY_RISKS_SAT': getContractRisksSat({
            body,
            originalDocumentNumber: contractNumber,
        }),

        'PAS_IMPL.POLICY_BENEFICIARY_SAT': getBeneficiarySat({
            body,
            originalDocumentNumber: contractNumber,
        }),

        'PAS_IMPL.POLICY_INVESTMENT_SAT': getInvestmentSat({
            body,
            originalDocumentNumber: contractNumber,
        }),

        'PAS_IMPL.ADDITIONAL_BENEFICIARY_SAT': getAdditionalBeneficiarySat({
            body,
            originalDocumentNumber: contractNumber,
        }),

        'PAS_IMPL.CF_POLICY_SAT': getCreatedFromPolicySat({
            body,
            originalDocumentNumber: contractNumber,
        }),

        'PAS_IMPL.POLICY_ASSET_SAT': getAssetSat({
            body,
            number: contractNumber,
        }),
    };
};
