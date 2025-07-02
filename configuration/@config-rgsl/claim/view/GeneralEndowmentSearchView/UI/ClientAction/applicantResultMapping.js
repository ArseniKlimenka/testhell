'use strict';

module.exports = function applicantResultMapping(input) {

    const lookupSelection = input.getLookupSelection();

    if (lookupSelection[0] && lookupSelection[0].resultData) {

        const selected = lookupSelection[0];

        input.context.request.data.criteria.applicantCode = selected.resultData.code;
        input.context.request.data.criteria.applicantFullName = selected.resultData.fullName;
    }
};
