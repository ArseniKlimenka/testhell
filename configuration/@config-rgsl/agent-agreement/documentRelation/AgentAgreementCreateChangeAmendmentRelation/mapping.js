'use strict';

const dateUtils = require('@config-rgsl/infrastructure/lib/DateTimeUtils');

module.exports = function mapping(initialDocument) {

    const updatedDocument = Object.assign({}, initialDocument);
    updatedDocument.amendmentData = {};
    updatedDocument.amendmentData.changeAmendmentData = {};
    updatedDocument.amendmentData.changeAmendmentData.sourceDocumentNumber = this.businessContext.documentNumber;
    updatedDocument.amendmentData.changeAmendmentData.sourceDocumentId = this.businessContext.entityId;
    updatedDocument.amendmentData.changeAmendmentData.validity = {};
    updatedDocument.amendmentData.changeAmendmentData.validity.startDate = dateUtils.dateNow();
    updatedDocument.amendmentData.changeAmendmentData.validity.endDate = initialDocument.validity.endDate;

    // Modify initial amendment data here.

    return { body: updatedDocument };
};
