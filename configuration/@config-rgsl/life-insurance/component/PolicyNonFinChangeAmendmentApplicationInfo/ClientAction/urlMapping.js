const uriBuilder = require("@config-rgsl/infrastructure/lib/UriBuilder");

module.exports = function urlMapping(input) {

    const requestNumber = input.context.Body.amendmentData?.nonFinChangeAmendmentData?.technicalData?.requestData?.number;

    if (!requestNumber) {

        return;
    }

    return uriBuilder.getUniverslaDocumentUri(requestNumber, 'LifeInsuranceRequest');
};
