'use strict';

module.exports = function apply(sinkResult, sinkInput, sinkExchange) {

    const ppData = sinkResult.data.map(r => r.resultData);
    sinkExchange.mapContext('ppData', ppData);
};
