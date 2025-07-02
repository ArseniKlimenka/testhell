'use strict';

module.exports = function apply(sinkResult, sinkInput, sinkExchange) {

    if ((sinkResult.data?.length ?? 0) === 0) {

        return;
    }

    const claim = sinkResult.data[0];
    sinkExchange.claimData = claim?.resultData;
};
