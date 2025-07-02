'use strict';

module.exports = function mapping(input) {
    return {
        input: {
            data: {
                criteria: {
                    originalDocumentId: input.entityId,
                    versionStateWithNull: 'Applied'
                }
            }
        }
    };
};
