'use strict';

const DateTimeUtils = require('@config-rgsl/infrastructure/lib/DateTimeUtils');

module.exports = function apply(sinkResult, sinkInput, sinkExchange) {

    if (sinkResult?.data?.length === 0) {

        return;
    }

    sinkExchange.partiesInfo = sinkResult.data.map(i => i.resultData);
};
