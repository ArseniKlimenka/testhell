'use strict';

module.exports = function insuredOnSelected(input) {

    const lookupSelection = input.getLookupSelection();
    input.data.request.data.criteria.insuredPartyCode = lookupSelection[0].metadata.code;

};
