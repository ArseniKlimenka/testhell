'use strict';

module.exports = function holderOnSelected(input) {

    const lookupSelection = input.getLookupSelection();
    input.data.request.data.criteria.holderPartyCode = lookupSelection[0].metadata.code;

};
