'use strict';

module.exports = function mapping(input, sinkExchange) {
    return {
        input: {
            data: {
                criteria: {
                    entityId: input.entityId
                }
            }
        }
    };
};
