'use strict';
const dateUtils = require('@config-rgsl/infrastructure/lib/DateTimeUtils');

module.exports = function resultMapping(input) {

    let accountsArray = [];

    if (input) {

        const activeOnly = this.businessContext.data.criteria.activeOnly;
        const tillDate = this.businessContext.data.criteria.tillDate;
        const body = JSON.parse(input.BODY);
        accountsArray = body.partyBankAccounts || [];

        if (activeOnly && !tillDate) {

            accountsArray = accountsArray.filter(a => !a.closingDate);
        }

        if (tillDate) {

            accountsArray = accountsArray.filter(a => !a.closingDate || tillDate <= a.closingDate);
        }
    }

    return accountsArray;
};
