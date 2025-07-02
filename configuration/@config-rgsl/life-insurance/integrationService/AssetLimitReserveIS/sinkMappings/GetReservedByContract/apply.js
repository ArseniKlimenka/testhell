'use strict';

module.exports = function apply(sinkResult, sinkInput, sinkExchange) {

    sinkExchange.reservedByContract = sinkResult.data?.amount ?? 0;
};
