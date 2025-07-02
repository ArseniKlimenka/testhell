'use strict';

module.exports = function apply(sinkResult, sinkInput, sinkExchange) {

    const policyInfo = sinkResult.data.map(_ => _.resultData);

    sinkExchange.mapContext('policyInfo', policyInfo);
};
