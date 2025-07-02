'use strict';

module.exports = function mapping(input, sinkExchange) {

    const importDocumentId = input.id;

    return {
        input: {
            data: {
                criteria: {
                    importDocumentId: importDocumentId
                }
            }
        }
    };
};
