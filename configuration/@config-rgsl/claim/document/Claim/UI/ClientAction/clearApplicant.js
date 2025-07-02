'use strict';

module.exports = function clearApplicant(input) {

    const applicantCode = input.data.Body.mainAttributes?.applicationInfo?.applicant?.partyCode;

    if (applicantCode) {

        delete input.data.Body.mainAttributes.applicationInfo.applicant.partyCode;
        delete input.data.Body.mainAttributes.applicationInfo.applicant.fullName;
    }
};
