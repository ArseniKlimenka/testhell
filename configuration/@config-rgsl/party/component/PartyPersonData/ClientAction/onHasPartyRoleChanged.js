'use strict';

const { countryRussia } = require('@config-rgsl/party/lib/partyConstantsImpl');
const configValidationByRole = require('@config-rgsl/party/lib/partyValidationByRoleConstant');

module.exports = function onHasPartyRoleChanged(input) {

    const partyRole = input?.additionalContext?.partyRole;

    if ((partyRole === configValidationByRole.PolicyHolderBoxNaturalPerson.code || partyRole === configValidationByRole.InsuredBoxNaturalPerson.code)
        && (!input.data.citizenship || input.data.citizenship.length === 0)) {
        input.data.citizenship = [countryRussia];
    }

    this.view.rebind();
};
