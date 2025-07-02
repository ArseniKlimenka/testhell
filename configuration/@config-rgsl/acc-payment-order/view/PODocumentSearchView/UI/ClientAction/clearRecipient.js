'use strict';

module.exports = function clearRecipient(input) {

    if (input.context.request.data.criteria.recipientPartyCode) {

        input.context.request.data.criteria.recipientPartyCode = undefined;
        input.context.request.data.criteria.recipientFullName = undefined;
    }
};
