'use strict';

const { getAdditionalInitiatorsSat, getAdditionalInitiatorsLink } = require('@config-rgsl/infrastructure/lib/SinkMappingHelperContract');

module.exports = function mapping(input, sinkExchange) {

    const policyData = sinkExchange.resolveContext('latestPolicyData');
    const body = policyData.snapshotBody;

    return {
        'PAS_IMPL.POLICY_ADDITIONAL_INITIATOR_SAT': getAdditionalInitiatorsSat({
            body: body,
            originalDocumentNumber: input.contractNumber
        }),
        'PAS_IMPL.POLICY_ADDITIONAL_INITIATOR_LINK': getAdditionalInitiatorsLink({
            body: body,
            originalDocumentNumber: input.contractNumber
        })
    };
};
