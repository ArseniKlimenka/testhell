'use strict';

module.exports = function mapping(lineInput) {

    const result = {
        businessNumber: this.businessContext.etlServiceInput.importDocumentNumber
    };

    return result;
};
