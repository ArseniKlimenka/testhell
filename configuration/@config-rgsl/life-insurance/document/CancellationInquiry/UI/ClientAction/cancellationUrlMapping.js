const uriBuilder = require("@config-rgsl/infrastructure/lib/UriBuilder");

module.exports = function cancellationUrlMapping(input) {

    const link = uriBuilder.getContractAmendmentUri("Contract", input.data.Body.configurationCodeName, input.data.Body.cancellationNumber);
    return link;
};
