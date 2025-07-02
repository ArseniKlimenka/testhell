'use strict';

module.exports = function applicantResultMapping(input, ambientProperties) {

    const lookupSelection = input.getLookupSelection();

    if (lookupSelection[0] && lookupSelection[0].resultData) {

        const partyType = lookupSelection[0].resultData.partyType ?? lookupSelection[0].metadata.configurationName;
        const applicant = input.componentContext.applicant;
        applicant.partyCode = lookupSelection[0].resultData.code;
        applicant.partyType = partyType;
        applicant.fullName = lookupSelection[0].resultData.fullName;
    }

    this.rebindComponent();
};
