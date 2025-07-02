'use strict';

module.exports = function onChangeIsManualRegistrationAgency(input, ambientProperties) {

    const isManualRegistrationAgency = input.data.isManualRegistrationAgency;

    if (isManualRegistrationAgency) {
        input.data.registrationAgencyCode = undefined;
    }

    this.view.reevaluateRules();

};
