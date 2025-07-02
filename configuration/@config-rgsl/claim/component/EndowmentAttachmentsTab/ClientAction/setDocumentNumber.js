'use strict';

module.exports = function setDocumentNumber(input, ambientProperties) {

    const contractNumber = input.context.Body.mainAttributes?.contract?.number;

    if (contractNumber) {

        return { 'document-number': contractNumber };
    }
};
