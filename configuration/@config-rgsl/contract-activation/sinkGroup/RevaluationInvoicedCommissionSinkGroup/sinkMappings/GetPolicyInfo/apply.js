'use strict';

module.exports = function apply(sinkResult, sinkInput, sinkExchange) {

    let policyInfos = sinkResult.data.map(_ => _.resultData);
    policyInfos = policyInfos.filter(_ => _.currencyCode !== 'RUB');

    sinkExchange.mapContext('policyInfos', policyInfos);
};
