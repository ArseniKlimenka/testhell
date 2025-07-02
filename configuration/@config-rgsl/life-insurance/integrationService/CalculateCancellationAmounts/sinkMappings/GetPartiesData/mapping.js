'use strict';

module.exports = function fetchMapping(input, sinkExchange) {

    const holderId = input.body.technicalData?.policyParties?.holder?.personId;
    const recipients = input.body.paymentAmendmentConditions?.canellationRecipients ?? [];
    let partyIds = recipients.map(item => item.partyId);
    if (holderId) {
        partyIds.push(holderId);
    }
    partyIds = [...new Set(partyIds)];

    if (partyIds?.length === 0) {

        return;
    }

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
