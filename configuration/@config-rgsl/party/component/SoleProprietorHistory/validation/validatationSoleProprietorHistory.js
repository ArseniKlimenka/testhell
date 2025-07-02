const partyValidationHelper = require('@config-rgsl/party/lib/partyValidationHelper');

/**
* @errorCode {errorCode} badPeriod
* @errorCode {errorCode} duplicateOGRNIP
*/
module.exports = function validatationSoleProprietorHistory(input) {

    const validationErrors = [];
    const arrayHistory = input.soleProprietorHistory;
    const actor = this.applicationContext.actor;
    if (actor == 'SkipValidationIS') { return validationErrors; }

    partyValidationHelper.checkOgrnipUniqe(validationErrors, arrayHistory, this);
    partyValidationHelper.checkPeriodsIntersectedSoleProprietorHistory(validationErrors, arrayHistory, this);

    return validationErrors;
};
