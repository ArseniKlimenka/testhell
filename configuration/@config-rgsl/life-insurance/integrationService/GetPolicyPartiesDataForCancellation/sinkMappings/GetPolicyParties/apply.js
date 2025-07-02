'use strict';

module.exports = function apply(sinkResult, sinkInput, sinkExchange) {

    if (sinkResult?.data?.length > 1) {

        return;
    }

    sinkExchange.policyParties = sinkResult.data[0].resultData.parties;
};
