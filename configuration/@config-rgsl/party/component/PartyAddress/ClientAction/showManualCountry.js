'use strict';

const { addressType } = require('@config-rgsl/party/lib/partyConstantsImpl');

module.exports = function showManualCountry(input) {

    if (!input.context.addressType) {
        return false;
    }

    return input.context.addressType.addressTypeCode !== addressType.postal.code;
};
