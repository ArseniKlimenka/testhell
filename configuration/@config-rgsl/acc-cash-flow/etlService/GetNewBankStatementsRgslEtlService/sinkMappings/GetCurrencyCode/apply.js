'use strict';

module.exports = function applyPaymentPlanData(sinkResult, sinkInput, sinkExchange) {
    if (sinkResult.data.length != 1) {
        throw "Correct code not found!";
    }

    const currencyCode = sinkResult.data[0].resultData.currencyCode;
    sinkExchange.mapContext("currencyCode", currencyCode);
};
