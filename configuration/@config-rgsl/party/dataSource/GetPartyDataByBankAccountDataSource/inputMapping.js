'use strict';

module.exports = function (input) {

    const output = {
        parameters: {
            partyBankAccount: null,
            partyCode: null
        }
    };

    if (input.data.criteria.partyBankAccount) {

        output.parameters.partyBankAccount = input.data.criteria.partyBankAccount;
    }

    return output;
};
