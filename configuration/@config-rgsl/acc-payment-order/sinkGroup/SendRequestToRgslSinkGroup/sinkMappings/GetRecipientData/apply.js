'use strict';

module.exports = function apply(sinkResult, sinkInput, sinkExchange) {

    if (sinkResult?.data?.length === 0) {

        return;
    }

    const party = sinkResult.data[0].resultData;

    sinkExchange.mapContext('recipientData', party);
};
