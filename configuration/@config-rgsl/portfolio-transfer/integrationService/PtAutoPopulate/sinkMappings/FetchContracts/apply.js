'use strict';

module.exports = function apply(sinkResult, sinkInput, sinkExchange) {

    const ptItems = sinkResult.data.map(r => r.resultData);
    sinkExchange.mapContext('ptItems', ptItems);
};
