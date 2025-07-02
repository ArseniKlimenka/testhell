'use strict';
const partyTaxResidencyLib = require('@config-rgsl/party/component/PartyTaxResidency/lib/partyTaxResidencyLib');

/**
 * @errorCode {errorCode} residenceCountryRequired
 * @errorCode {errorCode} docTypeRequired
 * @errorCode {errorCode} otherDocTypeDescRequired
 * @errorCode {errorCode} startDateRequired
 * @errorCode {errorCode} endDateRequired
 */

module.exports = function validatePartyTaxResidency(input) {

    const actor = this.applicationContext.actor;
    if (actor == 'SkipValidationIS') { return []; }

    return partyTaxResidencyLib.partyTaxResidencyValidation(input, this);

};
