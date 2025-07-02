'use strict';

module.exports = function mapping(input) {
    return {
        importDocumentId: input.id,
        importDocumentNumber: input.number,
        attributeType: input.body.attributeType,
    };
};
