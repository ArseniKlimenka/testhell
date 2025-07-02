'use strict';

module.exports = function apply(sinkResult, sinkInput, sinkExchange) {

    sinkExchange.maxVersion = 0;

    if (sinkResult?.data && sinkResult.data[0]?.resultData?.version) {
        sinkExchange.maxVersion = sinkResult.data[0].resultData.version;
    }

};
