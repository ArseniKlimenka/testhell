'use strict';

module.exports = function apply(sinkResult, sinkInput, sinkExchange) {

    const paymentPlan = sinkResult.data.map(_ => _.resultData);

    sinkExchange.mapContext("paymentPlan", paymentPlan);
};
