'use strict';

module.exports = function apply(sinkResult, sinkInput, sinkExchange) {

    const resultData = sinkResult?.data[0]?.resultData;

    sinkExchange.netAssetsAmount = resultData?.netAssetsAmount;
    sinkExchange.freeMoney = resultData?.freeMoney;

};
