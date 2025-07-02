'use strict';

module.exports = function apply(sinkResult, sinkInput, sinkExchange) {

    const itemCountCreated = sinkResult.itemCountCreated;
    sinkExchange.mapContext('itemCountCreated', itemCountCreated);
};
