'use strict';

module.exports = function apply(sinkResult, sinkInput, sinkExchange) {

    const actData = getDataSourceResult(sinkResult);
    sinkExchange.mapContext("actData", actData);
};

function getDataSourceResult(sinkResult) {

    if (sinkResult?.data?.length !== 1) {

        throw new Error("Act not found");
    }

    return sinkResult.data[0].resultData;
}
