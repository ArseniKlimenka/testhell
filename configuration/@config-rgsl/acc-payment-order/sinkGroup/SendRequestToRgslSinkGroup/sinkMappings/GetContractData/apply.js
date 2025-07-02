'use strict';

module.exports = function apply(sinkResult, sinkInput, sinkExchange) {

    const contractData = getDataSourceResult(sinkResult);
    sinkExchange.mapContext("contractData", contractData);
};

function getDataSourceResult(sinkResult) {

    if (sinkResult?.data?.length !== 1) {

        throw new Error("Contract not found");
    }

    return sinkResult.data[0].resultData;
}
