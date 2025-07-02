'use strict';

module.exports = function apply(sinkResult, sinkInput, sinkExchange) {

    if (sinkResult?.data && sinkResult.data[0]?.resultData?.version) {
        sinkExchange.productConfiguration = sinkResult.data[0].resultData;
    }

};
