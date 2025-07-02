'use strict';

module.exports = function policyHolderOnSelected(input) {

    const lookupSelection = input.getLookupSelection();
    input.data.request.data.criteria.contractHolderCode = lookupSelection[0].metadata.code;

};
