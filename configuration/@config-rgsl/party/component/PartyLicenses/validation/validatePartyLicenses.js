
'use strict';

const partyValidationHelper = require('@config-rgsl/party/lib/partyValidationHelper');

/**
 * @errorCode {errorCode} isEmptyLicenses
 */

module.exports = function validatePartyLicenses(input) {

    const validationErrors = [];
    const actor = this.applicationContext.actor;
    if (actor == 'SkipValidationIS') { return validationErrors; }

    const partyLicenses = input.partyLicenses;
    const hasLicenses = input.partyLicensesAdditionalInfo?.hasLicenses;
    if (hasLicenses) {
        partyValidationHelper.checkIsEmptyField(partyLicenses, validationErrors, this.businessContext.dataPath, 'isEmptyLicenses');
    }

    return validationErrors;

};
