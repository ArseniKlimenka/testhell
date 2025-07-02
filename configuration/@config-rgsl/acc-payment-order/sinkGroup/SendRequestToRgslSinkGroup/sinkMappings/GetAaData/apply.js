'use strict';

module.exports = function apply(sinkResult, sinkInput, sinkExchange) {

    const aaData = getDataSourceResult(sinkResult);
    sinkExchange.mapContext("aaData", aaData);
};

function getDataSourceResult(sinkResult) {

    if (sinkResult?.data?.length !== 1) {

        throw new Error("AA not found");
    }

    return sinkResult.data[0].resultData;
}
