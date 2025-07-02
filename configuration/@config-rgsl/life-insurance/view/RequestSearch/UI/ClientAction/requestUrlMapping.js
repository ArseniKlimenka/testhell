'use strict';

const uriBuilder = require("@config-rgsl/infrastructure/lib/UriBuilder");
const { getValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');

module.exports = function requestUrlMapping(input) {

    const requestNumber = getValue(input, 'data.resultData.requestNumber');
    const requestConfName = getValue(input, 'data.resultData.requestConfName');

    return uriBuilder.getUniverslaDocumentUri(requestNumber, requestConfName);

};
