const uriBuilder = require("@config-rgsl/infrastructure/lib/UriBuilder");

module.exports = function urlMapping(input) {

    const documentNumber = input.data.resultData.actNo;
    const configurationCodeName = 'CommissionAct';

    return uriBuilder.getUniverslaDocumentUri(documentNumber, configurationCodeName);
};
