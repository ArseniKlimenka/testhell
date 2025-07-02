'use strict';

module.exports = function recipientBankAccountSearchRequestMapping(input) {

    const request = {
        data: {
            criteria: {}
        }
    };

    if (input.context.Body.recipientInformation.partyCodeName) {

        request.data.criteria.partyCode = input.context.Body.recipientInformation.partyCodeName;
        request.data.criteria.activeOnly = true;
    }
    else {

        return;
    }

    return request;
};
