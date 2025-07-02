'use strict';

const uriBuilder = require("@config-rgsl/infrastructure/lib/UriBuilder");

module.exports = function insuredEventNumberUriMapping(input) {

    const insuredEventNumber = input.data.insuredEventNumber;

    if (insuredEventNumber) {

        return uriBuilder.getUniverslaDocumentUri(insuredEventNumber, 'InsuredEvent');
    }
};
