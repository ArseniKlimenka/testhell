
const uriBuilder = require("@config-rgsl/infrastructure/lib/UriBuilder");

module.exports = function insuredEventUrlMapping(input) {

    const insuredEventNumber = input.data.Body.mainAttributes?.insuredEvent?.insuredEventNumber;

    if (!insuredEventNumber) {

        return;
    }

    return uriBuilder.getUniverslaDocumentUri(insuredEventNumber, 'InsuredEvent');
};
