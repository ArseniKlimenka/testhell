'use strict';

module.exports = function isEmailFilled(input, ambientProperties) {

    if (input.data.partyEmails?.length > 0) {
        return true;
    }

    return false;
};
