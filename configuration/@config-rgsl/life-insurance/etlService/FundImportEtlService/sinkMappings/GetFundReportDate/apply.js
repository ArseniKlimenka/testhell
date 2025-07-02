'use strict';

module.exports = function apply(sinkResult, sinkInput, sinkExchange) {

    sinkExchange.reportDateVersion = 1;

    if (sinkResult.data.length > 0) {

        sinkExchange.reportDateVersion = sinkResult.data.map(i => i.resultData).sort((a, b) => b.confVersion - a.confVersion)[0].reportDateVersion + 1;
    }
};
