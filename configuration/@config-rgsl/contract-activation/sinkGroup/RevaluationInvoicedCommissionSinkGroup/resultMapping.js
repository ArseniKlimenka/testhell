'use strict';

module.exports = function mapping(input, sinkExchange) {
    const result = sinkExchange.resolveContext('result');

    return {
        itemCountCreated: result?.length ?? 0,
    };
};
