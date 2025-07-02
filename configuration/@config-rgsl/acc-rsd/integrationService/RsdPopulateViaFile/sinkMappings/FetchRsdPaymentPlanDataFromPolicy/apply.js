'use strict';

module.exports = function apply(sinkResult, sinkInput, sinkExchange) {

    const ppItems = sinkResult.data.map(r => r.resultData);
    sinkExchange.mapContext('ppItems', ppItems);
};
