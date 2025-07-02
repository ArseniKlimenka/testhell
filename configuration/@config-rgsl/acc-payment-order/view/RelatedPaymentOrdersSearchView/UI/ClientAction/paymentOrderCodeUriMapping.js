'use strict';

const uriBuilder = require("@config-rgsl/infrastructure/lib/UriBuilder");
const { getValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');

module.exports = function paymentOrderCodeUriMapping(input) {

    const documentNumber = getValue(input, 'data.resultData.paymentOrderNumber');

    if (documentNumber) {

        return uriBuilder.getPaymentOrderUri(documentNumber);
    }
};
