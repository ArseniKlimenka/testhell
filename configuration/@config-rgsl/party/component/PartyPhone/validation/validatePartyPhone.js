
const partyPhoneLib = require('@config-rgsl/party/component/PartyPhone/lib/partyPhoneLib');
const configValidationByRole = require('@config-rgsl/party/lib/partyValidationByRoleConstant');

/**
 * @errorCode {errorCode} phoneTypeIsRequired
 * @errorCode {errorCode} countryCodeIsRequired
 * @errorCode {errorCode} fullNumber10Digits
 * @errorCode {errorCode} fullNumber15Digits
 */

module.exports = function validatePartyPhone(input) {

    const actor = this.applicationContext.actor;
    const businessContext = this.businessContext;
    const partyRole = businessContext?.rootData?.data?.partyRoleOfPerson?.partyRole || businessContext?.rootData?.partyRoleOfPerson?.partyRole;
    const skipForInsuredBoxRole = partyRole === configValidationByRole.InsuredBoxNaturalPerson.code;

    if (actor == 'SkipValidationIS' || skipForInsuredBoxRole) { return []; }

    return partyPhoneLib.phoneValidation(input, this);

};
