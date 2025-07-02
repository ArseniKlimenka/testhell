'use strict';
module.exports = function enableRegistrationAgencyCode(input, ambientProperties) {

    const dt = input.componentContext;
    if (dt) {
        return !dt.isManualRegistrationAgency;
    }

};
