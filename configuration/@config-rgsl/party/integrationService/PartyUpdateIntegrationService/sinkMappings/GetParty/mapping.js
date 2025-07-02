'use strict';

const partyUpdateValidationHelper = require('@config-rgsl/party/lib/partyUpdateValidationHelper');

module.exports = function mapping(sinkInput, sinkExchange) {

    const validationErrors = [];

    partyUpdateValidationHelper.partyBodyValidation(sinkInput.body, validationErrors, this);

    if (sinkInput.body.partyBankAccounts && sinkInput.body.partyBankAccounts[0] !== undefined) {

        validationErrors.concat(validatePartyBankAccount(sinkInput.body.partyBankAccounts[0]));
    }

    if (validationErrors.length > 0) {

        const errorMessage = validationErrors.join('\n');
        throw Error(errorMessage);
    }

    return {
        input: {
            data: {
                criteria: {
                    partyCode: sinkInput.partyCode
                }
            }
        }
    };
};

function validatePartyBankAccount(input) {

    return partyUpdateValidationHelper.bankAccountValidation(input, this);
}
