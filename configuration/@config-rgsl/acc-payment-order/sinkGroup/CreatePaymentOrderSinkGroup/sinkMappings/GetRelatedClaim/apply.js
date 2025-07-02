'use strict';

const { getValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');

module.exports = function apply(sinkResult, sinkInput, sinkExchange) {

    const data = getValue(sinkResult, 'data');

    if (!data || data.length === 0) {

        return;
    }

    const claimBody = sinkResult.data[0].resultData.body;
    const claimNumber = sinkResult.data[0].resultData.number;

    sinkExchange.mapContext('claimBody', claimBody);
    sinkExchange.mapContext('claimNumber', claimNumber);
};
