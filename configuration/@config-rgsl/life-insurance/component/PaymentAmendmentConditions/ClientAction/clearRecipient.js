'use strict';

module.exports = function clearRecipient(input) {

    if (input.data && input.data.partyCode) {

        delete input.data.partyCode;
        delete input.data.partyType;
        delete input.data.fullName;
    }
};
