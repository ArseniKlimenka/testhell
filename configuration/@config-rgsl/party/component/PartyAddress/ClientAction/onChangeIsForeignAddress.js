'use strict';

const addressHelper = require('@config-rgsl/infrastructure/lib/AddressHelper');

module.exports = function onChangeIsForeignAddress(input, ambientProperties) {

    const isManualAddress = input.context.isManualAddress;

    if (!isManualAddress) {
        input.context.fullAddress = {};
        addressHelper.clearAddressDetails(input.context);
    }

    input.context.isManualAddress = false;
    input.context.manualCountry = undefined;

    this.view.validate();
    this.view.reevaluateRules();
};
