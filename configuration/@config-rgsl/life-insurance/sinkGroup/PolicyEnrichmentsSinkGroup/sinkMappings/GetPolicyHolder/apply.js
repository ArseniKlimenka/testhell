'use strict';

module.exports = function apply(sinkResult, sinkInput, sinkExchange) {

    if (sinkResult?.data?.length === 0) {

        throw new Error(`Контрагент не найден`);
    }

    const party = sinkResult.data[0].resultData;
    const partyId = party.partyId;
    sinkExchange.body.policyHolder.partyData.partyId = partyId;
};
