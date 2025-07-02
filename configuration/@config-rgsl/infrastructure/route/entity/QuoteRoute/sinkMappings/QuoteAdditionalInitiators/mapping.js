'use strict';

const { getAdditionalInitiatorsSat, getAdditionalInitiatorsLink } = require('@config-rgsl/infrastructure/lib/SinkMappingHelperContract');

module.exports = function mapping({
    body,
    originalDocumentNumber
}) {
    return {
        'PAS_IMPL.QUOTE_ADDITIONAL_INITIATOR_SAT': getAdditionalInitiatorsSat({
            body,
            originalDocumentNumber
        }),
        'PAS_IMPL.QUOTE_ADDITIONAL_INITIATOR_LINK': getAdditionalInitiatorsLink({
            body,
            originalDocumentNumber
        })
    };
};
