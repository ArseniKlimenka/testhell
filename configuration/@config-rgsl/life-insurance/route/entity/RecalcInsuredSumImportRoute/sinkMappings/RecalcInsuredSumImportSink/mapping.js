"use strict";

module.exports = function mapping(input) {

    return {
        importDocumentId: input.id,
        importDocumentNumber: input.number,
        fileId: input.body.file.fileId,
        fileName: input.body.file.fileName
    };
};
