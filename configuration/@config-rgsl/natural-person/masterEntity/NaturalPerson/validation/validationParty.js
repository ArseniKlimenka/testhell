const validationByRole = require('@config-rgsl/party/lib/partyValidationByRole');

/**
 * @errorCode {errorCode} isPodFt
 */

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

    if (input.partyGeneralData.isPodFt) {

        validationErrors.push({
            errorCode: 'isPodFt',
            errorDataPath: `${dataPath}/partyGeneralData/isPodFt`,
            severity: 'Note'
        });
    }

    return validationErrors;
};
