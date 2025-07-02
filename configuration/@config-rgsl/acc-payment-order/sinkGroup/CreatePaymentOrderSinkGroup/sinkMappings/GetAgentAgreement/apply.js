'use strict';

const { getValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');

module.exports = function apply(sinkResult, sinkRequest, sinkExchange) {

    const data = getValue(sinkResult, 'data');

    if (!data || data.length === 0) {

        return;
    }

    sinkExchange.agentAgreementData = sinkResult.data[0].resultData;
};
