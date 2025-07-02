'use strict';

module.exports = function mapping(input, sinkExchange) {

    return {
        request: {
            MessageTimestampUtc: sinkExchange.timeStamp,
            MessageCorrelationId: sinkExchange.correlationId,
            MessageBody: sinkExchange.statusMessage
        }
    };
};
