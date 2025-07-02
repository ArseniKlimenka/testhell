'use strict';

const partyEmailLib = require('@config-rgsl/party/component/PartyEmail/lib/partyEmailLib');
const configValidationByRole = require('@config-rgsl/party/lib/partyValidationByRoleConstant');

/**
 * @errorCode {errorCode} emailFormat
 * @errorCode {errorCode} emailDuplicate
 */

module.exports = function validatePartyEmail(input) {

    const actor = this.applicationContext.actor;
    const businessContext = this.businessContext;
    const partyRole = businessContext?.rootData?.data?.partyRoleOfPerson?.partyRole || businessContext?.rootData?.partyRoleOfPerson?.partyRole;
    const skipForInsuredBoxRole = partyRole === configValidationByRole.InsuredBoxNaturalPerson.code;

    if (actor == 'SkipValidationIS' || skipForInsuredBoxRole) { return []; }

    return partyEmailLib.emailValidation(input, this);

};
