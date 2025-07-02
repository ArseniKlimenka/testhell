'use strict';

module.exports = function clearApplicant(input) {


    const applicantCode = input.componentContext?.applicant?.partyCode;

    if (applicantCode) {

        delete input.componentContext.applicant.partyCode;
        delete input.componentContext.applicant.fullName;
        delete input.componentContext.applicant.partyType;
    }
};
