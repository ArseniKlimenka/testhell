'use strict';

module.exports = function applicantOnSelected(input) {

    const lookupSelection = input.getLookupSelection();
    input.data.request.data.criteria.requestApplicantCode = lookupSelection[0].metadata.code;

};
