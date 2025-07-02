
'use strict';

const partyValidationHelper = require('@config-rgsl/party/lib/partyValidationHelper');

/**
 * @errorCode {errorCode} addressesPeriodsIntercrossing
 */

module.exports = function validatePartyAddresses(input) {

    const validationErrors = [];
    const arrayHistory = input.partyAddresses;
    const actor = this.applicationContext.actor;
    if (actor == 'SkipValidationIS') { return validationErrors; }

    partyValidationHelper.checkPeriodsIntersectedAddresses(validationErrors, arrayHistory, this);

    return validationErrors;

};
