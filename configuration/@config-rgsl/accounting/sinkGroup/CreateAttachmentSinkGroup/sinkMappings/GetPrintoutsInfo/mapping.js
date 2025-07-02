'use strict';

module.exports = function mapping(input, sinkExchange) {

    return {
        request: {
            configurationName: input.configurationName
        }
    };
};
