
'use strict';

const partyValidationHelper = require('@config-rgsl/party/lib/partyValidationHelper');

/**
 * @errorCode {errorCode} bankAccountsPeriodsIntercrossing
 */

module.exports = function validatePartyBankAccounts(input) {

    const validationErrors = [];
    const arrayHistory = input.partyBankAccounts?.filter(x => x.openingDate || x.closingDate);
    const actor = this.applicationContext.actor;
    if (actor == 'SkipValidationIS') { return validationErrors; }

    partyValidationHelper.checkPeriodsIntersectedBankAccounts(validationErrors, arrayHistory, this);

    return validationErrors;

};
