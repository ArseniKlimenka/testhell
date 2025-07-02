'use strict';

module.exports = function recipientResultMapping(input) {

    const lookupSelection = input.getLookupSelection();

    if (lookupSelection[0] && lookupSelection[0].resultData) {

        const selected = lookupSelection[0];

        input.context.request.data.criteria.recipientPartyCode = selected.resultData.code;
        input.context.request.data.criteria.recipientFullName = selected.resultData.fullName;
    }
};
