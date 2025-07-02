'use strict';

module.exports = function resultMapping(input) {

    const output = {};

    output.documentNumber = input.DOCUMENT_NUMBER;
    output.stateCode = input.CODE_NAME;
    output.correctionNumber = input.CORRECTION_NUMBER;

    return output;
};
