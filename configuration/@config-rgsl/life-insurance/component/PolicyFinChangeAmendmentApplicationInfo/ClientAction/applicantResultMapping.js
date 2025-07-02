'use strict';

module.exports = function applicantResultMapping(input, ambientProperties) {

    const lookupSelection = input.getLookupSelection();
    const view = this.view;

    if (lookupSelection[0] && lookupSelection[0].resultData) {

        const partyType = lookupSelection[0].resultData.partyType ?? lookupSelection[0].metadata.configurationName;

        const applicantResult = {
            partyCode: lookupSelection[0].resultData.code,
            partyType: partyType,
            fullName: lookupSelection[0].resultData.fullName
        };

        input.componentContext.applicant = applicantResult;
    }

    view.rebind();
    view.reevaluateRules();
    view.validate();
};
