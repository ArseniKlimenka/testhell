'use strict';

const { translationUtils } = require('@adinsure/runtime');

module.exports = function resultMapping(input) {

    const output = {};

    output.documentNumber = input.DOCUMENT_NUMBER;
    output.listName = input.LIST_NAME;
    output.listNumber = input.LIST_NUMBER;
    output.listDate = input.LIST_DATE;
    output.partyCodes = input.PARTY_CODES;
    output.creationDate = input.CREATION_DATE;
    output.foundCodes = input.FOUND_CODES;
    output.notFoundCodes = input.NOT_FOUND_CODES;
    output.status = translationUtils.getTranslation(`document/AgentVerification/1`, 'states', null, input.STATUS);

    return output;
};
