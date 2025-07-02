'use strict';

module.exports = function clearApplicant(input) {

    const applicant = input.componentContext.applicant;
    if (applicant.partyCode) {

        delete applicant.partyCode;
        delete applicant.partyType;
        delete applicant.fullName;
    }
};
