'use strict';

module.exports = function setDocumentNumber(input, ambientProperties) {

    const contractNumber = input.context.OriginalDocumentNumber;

    if (contractNumber) {

        return { 'document-number': contractNumber };
    }
};
