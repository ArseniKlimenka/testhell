'use strict';

module.exports = function resultMapping(input) {

    const output = {
        contractEntityDocumentNumber: input.DOCUMENT_NUMBER,
        contractNumber: input.CONTRACT_NUMBER,
        codeName: input.CODE_NAME
    };

    return output;
};
