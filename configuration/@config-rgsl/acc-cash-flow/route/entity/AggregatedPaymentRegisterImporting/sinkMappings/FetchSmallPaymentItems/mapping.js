'use strict';

module.exports = function fetchMapping(dataSourceInput, sinkExchange) {

    return {
        input: {
            data: {
                criteria: {
                    importDocumentId: dataSourceInput.id,
                }
            }
        }
    };
};
