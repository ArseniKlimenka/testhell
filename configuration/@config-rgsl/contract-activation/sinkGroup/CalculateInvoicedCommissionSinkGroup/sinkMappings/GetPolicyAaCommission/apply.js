'use strict';

module.exports = function apply(sinkResult, sinkInput, sinkExchange) {

    const policyAaCommission = sinkResult.data.map(_ => _.resultData);
    sinkExchange.mapContext("policyAaCommission", policyAaCommission);
};
