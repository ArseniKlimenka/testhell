'use strict';

module.exports = function resultMapping(input) {

    const output = {};

    output.universalDocumentId = input.UNIVERSAL_DOCUMENT_ID;
    output.universalDocumentNumber = input.UNIVERSAL_DOCUMENT_NUMBER;
    output.universalDocumentState = input.UNIVERSAL_DOCUMENT_STATE;
    output.configurationName = input.CONFIGURATION_NAME;
    output.eTag = input.ETAG;
    output.body = input.BODY && JSON.parse(input.BODY) || {};

    return output;

};
