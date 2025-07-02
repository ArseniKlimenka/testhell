'use strict';

module.exports = function mapping(input, sinkExchange) {

    const policyParties = sinkExchange.policyParties;
    const holderId = policyParties?.holder?.personId;
    let partyIds = input.recipientsIds ?? [];


    partyIds.push(holderId);
    partyIds = [...new Set(partyIds)];

    return {
        input: {
            data: {
                criteria: {
                    partyIdsToInclude: partyIds
                }
            },
            paging: {
                page: 0,
                pageSize: 15
            }
        }
    };
};
