'use strict';

const uriBuilder = require("@config-rgsl/infrastructure/lib/UriBuilder");
const { getValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');

module.exports = function documentUrlMapping(input) {

    const documentNumber = getValue(input, 'data.resultData.documentNumber');
    const documentCodeName = getValue(input, 'data.resultData.documentCodeName');
    const configurationVersion = 1;

    if (documentCodeName == 'Endowment') {
        return uriBuilder.getUniverslaDocumentUri(documentNumber, documentCodeName);
    }
    return uriBuilder.getContractUri(documentCodeName, configurationVersion, documentNumber);


};
