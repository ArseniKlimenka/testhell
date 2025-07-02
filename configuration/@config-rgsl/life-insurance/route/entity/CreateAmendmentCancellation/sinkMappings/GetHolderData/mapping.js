'use strict';

module.exports = function fetchMapping(input, sinkExchange) {

    return {
        input: {
            data: {
                criteria: {
                    partyIdsToInclude: [sinkExchange.contractData.body.policyHolder.partyData.partyId]
                }
            },
            paging: {
                page: 0,
                pageSize: 15
            }
        }
    };
};
