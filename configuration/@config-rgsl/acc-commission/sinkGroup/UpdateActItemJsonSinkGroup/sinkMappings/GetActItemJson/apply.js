'use strict';

module.exports = function apply(sinkResult, sinkInput, sinkExchange) {

    const items = sinkResult.data.map(_ => _.resultData);
    sinkExchange.mapContext('items', items);
};
