'use strict';

const partyAddressLib = require('@config-rgsl/party/component/PartyAddress/lib/partyAddressLib');
const configValidationByRole = require('@config-rgsl/party/lib/partyValidationByRoleConstant');

/**
 * @errorCode {errorCode} fullAddressRequired
 * @errorCode {errorCode} addressTypeRequired
 * @errorCode {errorCode} actualFromIsNewest
 * @errorCode {errorCode} manualCountryRequired
 */

module.exports = function validatePartyAddress(input) {

    const actor = this.applicationContext.actor;
    const businessContext = this.businessContext;
    const partyRole = businessContext?.rootData?.data?.partyRoleOfPerson?.partyRole || businessContext?.rootData?.partyRoleOfPerson?.partyRole;
    const skipForBoxRoles = partyRole === configValidationByRole.PolicyHolderBoxNaturalPerson.code || partyRole === configValidationByRole.InsuredBoxNaturalPerson.code;

    if (actor == 'SkipValidationIS' || skipForBoxRoles) { return []; }

    return partyAddressLib.addressValidation(input, this);

};
