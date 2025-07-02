'use strict';

module.exports = function beneficiaryBankAccountRequestMapping(input) {

    const statementApplicationDate = input.rootContext.Body.mainAttributes.applicationInfo.statementApplicationDate;

    return {
        data: {
            criteria: {
                partyCode: input.data.partyCode || 'none',
                activeOnly: true,
                tillDate: statementApplicationDate
            }
        }
    };
};
