
const uriBuilder = require("@config-rgsl/infrastructure/lib/UriBuilder");

module.exports = function policyHolderUriMapping(input) {

    const policyHolderCode = input.data?.resultData?.policyHolderCode;
    const policyHolderType = input.data?.resultData?.policyHolderType;

    if (!policyHolderCode || !policyHolderType) {

        return;
    }

    return uriBuilder.getPartyUri(policyHolderType, policyHolderCode);
};
