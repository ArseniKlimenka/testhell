'use strict';

module.exports = function apply(sinkResult, sinkInput, sinkExchange) {

    const ppRsdItems = sinkResult.data.map(r => r.resultData);
    sinkExchange.mapContext('ppRsdItems', ppRsdItems);
};
