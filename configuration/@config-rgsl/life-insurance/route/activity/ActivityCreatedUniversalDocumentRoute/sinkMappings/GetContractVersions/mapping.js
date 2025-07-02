'use strict';

module.exports = function mapping(input, sinkExchange) {

    const quoteId = sinkExchange?.universalDocumentBody?.inquiry?.quoteId;
    if (!quoteId) { return; }

    return {
        input: {
            data: {
                criteria: {
                    originalDocumentId: sinkExchange?.universalDocumentBody?.inquiry?.quoteId,
                    versionStateWithNull: 'Applied'
                }
            }
        }
    };
};
