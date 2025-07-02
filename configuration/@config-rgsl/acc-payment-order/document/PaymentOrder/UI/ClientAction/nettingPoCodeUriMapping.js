'use strict';

const uriBuilder = require("@config-rgsl/infrastructure/lib/UriBuilder");

module.exports = function nettingPoCodeUriMapping(input) {

    const parentPaymentOrderNumber = input.rootContext.ClientViewModel.nettingPoNumber;

    if (parentPaymentOrderNumber) {

        return uriBuilder.getPaymentOrderUri(parentPaymentOrderNumber);
    }
};
