const { partyType, viewType } = require('@config-rgsl/party/lib/partyConstantsImpl');
const rolesObj = require('@config-rgsl/party/lib/partyValidationByRoleConstant.js');

module.exports = function partyRoleFilter(input) {

    const configurationCodeName = input.context.ConfigurationCodeName;
    const roles = Object.keys(rolesObj);
    const totalRolesNum = roles.length;
    const naturalPersonRolesNum = roles.filter(role => role.indexOf('LegalEntity') === -1).length;

    if (configurationCodeName === partyType.NaturalPerson || configurationCodeName === viewType.NaturalPerson) {
        return input.items.slice(0, naturalPersonRolesNum);
    }
    return input.items.slice(naturalPersonRolesNum, totalRolesNum);


};
