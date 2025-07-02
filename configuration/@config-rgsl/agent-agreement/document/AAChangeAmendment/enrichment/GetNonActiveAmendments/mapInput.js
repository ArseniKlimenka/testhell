'use strict';

module.exports = function mapping(input) {

    return {
        data: {
            criteria: {
                originalAaNumber: this.businessContext.originalDocumentNumber,
                currentAmendmentNumber: this.businessContext.documentNumber
            }
        }
    };
};
