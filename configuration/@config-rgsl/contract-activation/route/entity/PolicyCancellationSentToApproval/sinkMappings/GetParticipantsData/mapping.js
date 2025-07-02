'use strict';

module.exports = function mapping(input) {

    const body = input.body;
    const policyHolderCode = body.technicalData.policyParties.holder.personCode;
    const recipients = body.paymentAmendmentConditions.canellationRecipients ?? [];
    let partyCodes = recipients.map(item => item.partyCode);
    partyCodes.push(policyHolderCode);
    partyCodes = [...new Set(partyCodes)];

    return {
        input: {
            data: {
                criteria: {
                    partyCodesToInclude: partyCodes
                }
            },
            paging: {
                page: 0,
                pageSize: 15
            }
        }
    };
};
