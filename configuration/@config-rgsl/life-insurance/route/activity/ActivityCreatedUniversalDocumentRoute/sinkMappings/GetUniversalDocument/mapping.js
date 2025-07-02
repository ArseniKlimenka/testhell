'use strict';

module.exports = function mapping(input) {
    return {
        input: {
            data: {
                criteria: {
                    universalDocumentId: input.entityId
                }
            }
        }
    };
};
