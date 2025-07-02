'use strict';

module.exports = function mapping(sourceDocument) {

    const targetDocument = {
        claimNumber: this.businessContext.documentNumber
    };

    return { body: targetDocument };
};
