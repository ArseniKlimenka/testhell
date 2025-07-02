'use strict';

module.exports = function apply(sinkResult, sinkRequest, sinkExchange) {

    if (sinkResult?.data?.length === 0) {

        return;
    }

    const party = sinkResult.data[0].resultData;
    sinkExchange.recipientPartyData = party;
};
