'use strict';

const configValidationByRole = require('@config-rgsl/party/lib/partyValidationByRoleConstant');

module.exports = function applyData(input) {

    const body = this.businessContext?.rootData?.data || this.businessContext?.rootData;
    const partyRole = body?.partyRoleOfPerson?.partyRole;

    if (partyRole === configValidationByRole.InsuredBoxNaturalPerson.code) {
        body.partyPhones = body.partyPhones.filter(item => item.fullNumber);
    }

};
