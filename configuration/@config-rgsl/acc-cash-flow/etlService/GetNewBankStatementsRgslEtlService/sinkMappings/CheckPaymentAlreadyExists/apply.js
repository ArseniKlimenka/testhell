'use strict';

module.exports = function applyPaymentPlanData(sinkResult, sinkInput, sinkExchange) {
    const guidAlreadyExists = sinkResult.data.length !== 0;
    sinkExchange.mapContext("guidAlreadyExists", guidAlreadyExists);
};
