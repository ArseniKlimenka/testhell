'use strict';

module.exports = function mapping(sinkInput, sinkExchange) {

    const actItems = sinkExchange.resolveContext('actItems');

    return {
        actItems: actItems,
    };
};
