'use strict';

const { translationUtils } = require('@adinsure/runtime');

module.exports = function resultMapping(input) {

    const output = {};

    output.universalVersionedDocumentId = input.UNIVERSAL_VERSIONED_DOCUMENT_ID;
    output.accountingCertificateNumber = input.UNIVERSAL_VERSIONED_DOCUMENT_NUMBER;
    output.body = input.BODY;

    return output;
};
