
const uriBuilder = require("@config-rgsl/infrastructure/lib/UriBuilder");

module.exports = function contractNumberUriMapping(input) {

    const contractNumber = input.data?.resultData?.contractNumber;
    const contractType = input.data?.resultData?.contractType;

    if (!contractNumber || !contractType) {

        return;
    }

    return uriBuilder.getContractUri(contractType, '1', contractNumber);
};
