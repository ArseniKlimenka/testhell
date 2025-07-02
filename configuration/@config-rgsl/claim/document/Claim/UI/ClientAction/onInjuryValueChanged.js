'use strict';

module.exports = function onInjuryValueChanged(input) {

    const injuryDetails = input.rowContext?.injuryDetails;

    if (injuryDetails) {

        input.data.paymentInjuryPercentage = injuryDetails.defaultPymentPercentage;
    }
    else {

        delete input.data.paymentInjuryPercentage;
    }

    this.view.rebind();
    this.view.reevaluateRules();
    this.view.validate();
};
