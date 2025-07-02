'use strict';

module.exports = function mapping(input, sinkExchange) {

    return {
        messages: sinkExchange.logMessages ?? []
    };
};
