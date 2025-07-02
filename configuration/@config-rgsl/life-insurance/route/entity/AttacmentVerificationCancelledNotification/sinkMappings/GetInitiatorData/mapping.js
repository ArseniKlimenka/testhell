'use strict';

module.exports = function mapping(messageContext, sinkExchange) {

    const userId = sinkExchange.body.initiator.userId;

    if (userId) {

        return {
            input: {
                data: {
                    criteria: {
                        userId: userId
                    }
                }
            }
        };

    }

    return null;
};
