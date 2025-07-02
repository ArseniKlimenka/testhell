"use strict";

module.exports = function mapping(input) {

    return {
        importDocumentId: input.id,
        importDocumentNumber: input.number,
        contractNumber: input.body.contractNumber,
        fileId: input.body.file.fileId,
        fileName: input.body.file.fileName
    };
};
