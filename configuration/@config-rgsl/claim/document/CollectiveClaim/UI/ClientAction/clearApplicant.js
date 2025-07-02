'use strict';

module.exports = function clearApplicant(input) {

    if ( input.data.Body.mainAttributes?.applicationInfo?.applicant?.partyCode) {

        delete input.data.Body.mainAttributes.applicationInfo.applicant.partyCode;
        delete input.data.Body.mainAttributes.applicationInfo.applicant.fullName;
    }
};
