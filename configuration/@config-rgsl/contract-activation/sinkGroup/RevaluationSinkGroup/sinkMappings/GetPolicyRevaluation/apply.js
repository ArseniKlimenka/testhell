'use strict';

module.exports = function apply(sinkResult, sinkInput, sinkExchange) {

    const lastData = sinkResult.data.map(_ => _.resultData);
    sinkExchange.mapContext('lastData', lastData);
};
