'use strict';

module.exports = function mapping(initialDocument) {

    const updatedDocument = Object.assign({}, initialDocument);
    updatedDocument.amendmentData = {};
    updatedDocument.amendmentData.cancellationAmendmentData = {};
    updatedDocument.amendmentData.cancellationAmendmentData.sourceDocumentNumber = this.businessContext.documentNumber;
    updatedDocument.amendmentData.cancellationAmendmentData.sourceDocumentId = this.businessContext.entityId;

    // Modify initial amendment data here.

    return { body: updatedDocument };
};
