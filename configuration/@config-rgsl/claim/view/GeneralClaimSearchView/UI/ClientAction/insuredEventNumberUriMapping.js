'use strict';

const uriBuilder = require("@config-rgsl/infrastructure/lib/UriBuilder");

module.exports = function insuredEventNumberUriMapping(input) {

    const insuredEventNumber = input.data?.resultData?.insuredEvent?.insuredEventNumber;

    if (insuredEventNumber) {

        return uriBuilder.getUniverslaDocumentUri(insuredEventNumber, 'InsuredEvent');
    }
};
