'use strict';

module.exports = function policyHolderResultAssignment(input) {

    const lookupSelection = input.getLookupSelection();
    input.data.request.data.criteria.policyHolderCode = lookupSelection[0].metadata.code;

};
