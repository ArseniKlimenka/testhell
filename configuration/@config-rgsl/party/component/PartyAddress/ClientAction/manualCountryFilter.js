'use strict';

const { countryRussia } = require('@config-rgsl/party/lib/partyConstantsImpl');

module.exports = function manualCountryFilter(input, ambientProperties) {

    const currentItems = input.items;
    const isManualAddress = input.context.isManualAddress;

    return isManualAddress
        ? currentItems.filter(item => item.countryCode === countryRussia.countryCode)
        : currentItems.filter(item => item.countryCode !== countryRussia.countryCode);
};
