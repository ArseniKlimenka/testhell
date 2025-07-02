'use strict';

module.exports = function apply(sinkResult, sinkInput, sinkExchange) {


    if (sinkResult?.data?.length === 0) {

        return;
    }

    const party = sinkResult.data[0].resultData;

    sinkExchange.body = party.body;
    sinkExchange.commonBody = party.commonBody;
    sinkExchange.partyCode = party.partyCode;
    sinkExchange.partyType = party.partyType;

};
