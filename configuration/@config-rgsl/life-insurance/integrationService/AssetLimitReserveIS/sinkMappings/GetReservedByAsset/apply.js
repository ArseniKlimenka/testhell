'use strict';

module.exports = function apply(sinkResult, sinkInput, sinkExchange) {

    sinkExchange.reservedByAsset = sinkResult.data?.amount ?? 0;
};
