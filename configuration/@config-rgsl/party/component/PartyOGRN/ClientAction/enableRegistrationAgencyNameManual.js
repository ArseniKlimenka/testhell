'use strict';
module.exports = function enableRegistrationAgencyNameManual(input, ambientProperties) {

    const dt = input.componentContext;
    if (dt) {
        return dt.isManualRegistrationAgency;
    }

};
