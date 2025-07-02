'use strict';

module.exports = function fetchMapping(input, sinkExchange) {

    return {
        input: {
            data: {
                criteria: {
                    groupId: `${input.entityType}@${input.documentId}@Core.Document.StateChanged@Default`
                }
            }
        }
    };
};
