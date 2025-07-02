const validationByRole = require('@config-rgsl/party/lib/partyValidationByRole');

module.exports = function validationParty(input, ambientProperties) {
    const validationErrors = [];
    const partyRole = input.partyRoleOfPerson?.partyRole;
    const context = this.businessContext.rootData;
    const dataPath = this.businessContext.dataPath;
    const actor = this.applicationContext.actor;

    if (actor == 'SkipValidationIS') { return validationErrors; }

    if (partyRole) {
        validationByRole.validationByRole(dataPath, partyRole, context, validationErrors);
    }

    return validationErrors;
};
