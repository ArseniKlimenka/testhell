'use strict';

module.exports = function mapping(input) {

    return {
        input: {
            data: {
                criteria: {
                    originalDocumentId: input.id,
                    versionStateWithNull: 'Applied'
                }
            }
        }
    };
};
