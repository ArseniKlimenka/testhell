'use strict';

const DateTimeUtils = require('@config-rgsl/infrastructure/lib/DateTimeUtils');

module.exports = function mapping(initialDocument) {

    const updatedDocument = Object.assign({}, initialDocument);
    updatedDocument.correctionData = {};
    updatedDocument.correctionData.sourceDocumentNumber = this.businessContext.documentNumber;
    updatedDocument.correctionData.sourceDocumentId = this.businessContext.entityId;
    updatedDocument.correctionData.validity = {};
    updatedDocument.correctionData.validity.startDate = DateTimeUtils.dateNow();

    // Modify initial correction data here.

    return { body: updatedDocument };
};
