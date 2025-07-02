"use strict";

module.exports = function mapping(input, sinkExchange) {

    const shouldSendToPaid = sinkExchange.resolveContext('sendToPaid');

    if (shouldSendToPaid) {

        return {
            businessNumber: input.number
        };
    }
};
