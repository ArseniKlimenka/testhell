'use strict';

module.exports = function apply(sinkResult, sinkInput, sinkExchange) {

    let partiesData = [];

    if (sinkResult?.data?.length > 0) {

        partiesData = sinkResult.data.map(item => item.resultData);
    }

    sinkExchange.foundPartiesData = partiesData;
};
