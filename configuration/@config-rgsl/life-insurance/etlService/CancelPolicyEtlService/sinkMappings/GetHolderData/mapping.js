'use strict';

module.exports = function fetchMapping(input, sinkExchange) {

    if (!sinkExchange.canCreateCancellation) {

        return null;
    }

    const stateBody = (sinkExchange.latestContractData.seqNumber == 0 ? sinkExchange.latestContractData.body : sinkExchange.latestContractData.snapshotBody)
    ?? sinkExchange.latestContractData.body;

    return {
        input: {
            data: {
                criteria: {
                    partyIdsToInclude: [stateBody?.policyHolder?.partyData?.partyId]
                }
            },
            paging: {
                page: 0,
                pageSize: 15
            }
        }
    };
};
