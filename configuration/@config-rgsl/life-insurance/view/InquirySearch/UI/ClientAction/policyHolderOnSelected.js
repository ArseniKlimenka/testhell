'use strict';

module.exports = function policyHolderOnSelected(input) {

    const lookupSelection = input.getLookupSelection();
    input.data.request.data.criteria.holderCode = lookupSelection[0].metadata.code;

};
