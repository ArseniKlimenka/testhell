'use strict';

module.exports = function mapping(input, sinkExchange) {

    if (!sinkExchange.assigneeId) {

        return;
    }

    return {
        input: {
            data: {
                criteria: {
                    applicationUserId: sinkExchange.assigneeId
                }
            }
        }
    };
};
