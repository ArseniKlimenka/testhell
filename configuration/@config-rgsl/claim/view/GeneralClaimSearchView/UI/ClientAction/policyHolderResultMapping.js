'use strict';

module.exports = function policyHolderResultMapping(input) {

    const lookupSelection = input.getLookupSelection();

    if (lookupSelection[0] && lookupSelection[0].resultData) {

        const selected = lookupSelection[0];

        input.context.request.data.criteria.policyHolderCode = selected.resultData.code;
        input.context.request.data.criteria.policyHolderFullName = selected.resultData.fullName;
    }
};
