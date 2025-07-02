'use strict';

module.exports = function clearBeneficiary(input) {

    if (input.data?.partyCode) {

        delete input.data.partyCode;
        delete input.data.partyType;
        delete input.data.fullName;
        delete input.data.bankAccount;
    }
};
