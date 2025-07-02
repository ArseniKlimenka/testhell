const { getValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');
const partyOGRNLib = require('@config-rgsl/party/lib/partyOGRNLib');

/**
* @errorCode {errorCode} isErrorOGRN
* @errorCode {errorCode} comingDate
* @errorCode {errorCode} dateStartAftreStop
* @errorCode {errorCode} OGRNIsRequired
* @errorCode {errorCode} dateOfStateRegistrationIsRequired
* @errorCode {errorCode} registrationAgencyCodeIsRequired
* @errorCode {errorCode} registrationAgencyNameManualIsRequired
*/

module.exports = function validationPartyOGRN(input, ambientProperties) {

    const configurationCodeName = getValue(this, 'businessContext.configurationCodeName');
    const actor = this.applicationContext.actor;
    if (actor == 'SkipValidationIS') { return []; }

    return partyOGRNLib.partyOGRNValidation(input, this, configurationCodeName);

};
