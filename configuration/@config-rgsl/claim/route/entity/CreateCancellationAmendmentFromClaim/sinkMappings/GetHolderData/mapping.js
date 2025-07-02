'use strict';

module.exports = function fetchMapping(input, sinkExchange) {

    return {
        input: {
            data: {
                criteria: {
                    partyCodesToInclude: [sinkExchange.contractData.policyHolder.partyData.partyCode]
                }
            },
            paging: {
                page: 0,
                pageSize: 15
            }
        }
    };
};
