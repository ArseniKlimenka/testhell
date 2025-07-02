'use strict';

module.exports = function apply(sinkResult, sinkInput, sinkExchange) {

    const lastPolicies = sinkResult.data.map(r => r.resultData);
    sinkExchange.mapContext('policyData', lastPolicies[0]);
};
