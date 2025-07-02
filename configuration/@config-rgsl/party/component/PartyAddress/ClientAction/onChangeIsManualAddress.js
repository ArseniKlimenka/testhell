'use strict';

const addressHelper = require('@config-rgsl/infrastructure/lib/AddressHelper');

module.exports = function onChangeIsManualAddress(input, ambientProperties) {

    const isForeignAddress = input.context.isForeignAddress;

    if (!isForeignAddress) {
        input.context.fullAddress = {};
        addressHelper.clearAddressDetails(input.context);
    }

    input.context.isForeignAddress = false;
    input.context.manualCountry = undefined;

    this.view.validate();
    this.view.reevaluateRules();
};
