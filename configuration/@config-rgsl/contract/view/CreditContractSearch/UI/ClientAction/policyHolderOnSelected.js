'use strict';

module.exports = function policyHolderOnSelected(input) {

    const lookupSelection = input.getLookupSelection();
    input.data.request.data.criteria.holder = lookupSelection[0].metadata.code;

};
