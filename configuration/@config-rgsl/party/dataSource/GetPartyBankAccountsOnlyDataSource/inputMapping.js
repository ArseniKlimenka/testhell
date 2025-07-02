'use strict';

module.exports = function (input) {

    const output = {
        parameters: {
            partyCode: null
        }
    };

    if (input.data.criteria.partyCode && input.data.criteria.partyCode.length > 0) {

        output.parameters.partyCode = input.data.criteria.partyCode;
    }
    else {

        throw 'No criteria provided for GetPartyBankAccountsOnlyDataSource!';
    }

    return output;
};
