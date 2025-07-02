'use strict';

module.exports = function apply(sinkResult, sinkInput, sinkExchange) {

    const policyCommission = sinkResult.data.map(_ => _.resultData);
    sinkExchange.mapContext('policyCommission', policyCommission);
};
