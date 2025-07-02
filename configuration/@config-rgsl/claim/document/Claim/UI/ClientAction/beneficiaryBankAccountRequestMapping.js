'use strict';

module.exports = function beneficiaryBankAccountRequestMapping(input) {

    return {
        data: {
            criteria: {
                partyCode: input.data.partyCode ?? 'none',
                activeOnly: true
            }
        }
    };
};
