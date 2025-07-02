'use strict';

module.exports = function apply(sinkResult, sinkInput, sinkExchange) {

    let pereviousPayments = [];

    if (sinkResult?.data?.length > 0) {

        pereviousPayments = sinkResult.data.map(d => d.resultData);
    }

    sinkExchange.foundPreviousPayments = pereviousPayments;
};
