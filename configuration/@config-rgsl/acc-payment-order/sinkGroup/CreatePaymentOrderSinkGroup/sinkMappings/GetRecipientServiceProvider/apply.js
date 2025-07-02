'use strict';

const { getValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');

module.exports = function apply(sinkResult, sinkRequest, sinkExchange) {

    const data = getValue(sinkResult, 'data');

    if (!data) {

        return;
    }

    sinkExchange.recipientServiceProvider = sinkResult.data[0].resultData;
};
