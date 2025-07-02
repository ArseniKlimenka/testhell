const addressHelper = require('@config-rgsl/infrastructure/lib/AddressHelper');

module.exports = function populateAddressDetails(input) {

    if (!input.data) { return; }

    if (!input.data.fullAddress)
    { addressHelper.clearAddressDetails(input.data); }
    else
    { addressHelper.setAddressDetails(input.data); }

};
