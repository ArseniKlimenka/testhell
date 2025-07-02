'use strict';

module.exports = function apply(sinkResult, sinkInput, sinkExchange) {
    const oldPolicyData = sinkResult.data[0]?.resultData;
    const newPolicyData = sinkExchange.resolveContext('latestPolicyData');
    let policyData;

    if (!oldPolicyData) {
        policyData = newPolicyData;
    } else if (!newPolicyData) {
        policyData = oldPolicyData;
    } else if (oldPolicyData.seqNumber === newPolicyData.seqNumber) {
        policyData = newPolicyData;
    } else {
        policyData = oldPolicyData;
    }


    sinkExchange.mapContext('latestPolicyData', policyData);
};
