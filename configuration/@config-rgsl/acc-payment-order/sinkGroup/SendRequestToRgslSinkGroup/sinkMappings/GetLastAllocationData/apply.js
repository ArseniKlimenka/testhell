'use strict';

module.exports = function apply(sinkResult, sinkInput, sinkExchange) {

    if (sinkResult?.data?.length < 1) {

        return;
    }

    const lastAllocation = sinkResult.data[0].resultData;
    sinkExchange.mapContext('allocationDocumentNo', lastAllocation.refContractNo);
};
