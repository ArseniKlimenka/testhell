'use strict';

module.exports = function initiatorOnSelected(input) {

    const lookupSelection = input.getLookupSelection();
    input.data.request.data.criteria.initiatorServiceProviderCode = lookupSelection[0].metadata.code;
    input.data.request.data.criteria.initiatorName = lookupSelection[0].resultData.partyDisplayName;

};
