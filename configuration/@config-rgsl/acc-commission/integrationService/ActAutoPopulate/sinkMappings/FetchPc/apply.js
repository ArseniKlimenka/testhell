'use strict';

module.exports = function (sinkResult, sinkInput, sinkExchange) {

    const pcs = sinkResult.data.map(r => r.resultData);
    sinkExchange.mapContext('pcs', pcs);
};
