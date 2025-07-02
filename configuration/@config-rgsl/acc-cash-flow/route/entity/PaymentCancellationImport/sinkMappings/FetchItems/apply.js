'use strict';

module.exports = function apply(sinkResult, sinkInput, sinkExchange) {
    const items = sinkResult.data.map(i => (i.resultData));
    sinkExchange.mapContext('items', items);
};
