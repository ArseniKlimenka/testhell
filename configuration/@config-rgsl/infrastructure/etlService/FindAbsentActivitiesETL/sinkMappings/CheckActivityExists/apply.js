'use strict';

module.exports = function applyPaymentPlanData(sinkResult, sinkInput, sinkExchange) {
    const activityExists = sinkResult.data.length !== 0;
    sinkExchange.mapContext('activityExists', activityExists);
};
