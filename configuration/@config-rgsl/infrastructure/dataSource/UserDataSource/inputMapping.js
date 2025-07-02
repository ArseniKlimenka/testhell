module.exports = function DataSourceInputMapping(input) {

    if (!input?.data?.criteria) {
        throw 'Input criteria was not defined!';
    }

    const userRoles = this.applicationContext.user.applicationRoles;
    const availableRoles = [
        'GeneralBackOffice',
        'OrganisationAdministrator',
        'OrganisationViewer',
        'AllowInitiatorChangeOAS',
        'AllowInitiatorChange',
        'ContractModification'
    ];
    const isUserHaveAvailableRole = userRoles.some(x => availableRoles.includes(x));

    if (!isUserHaveAvailableRole) {
        if (input?.data?.criteria?.userId != this.applicationContext.user.id) {
            throw 'Insufficient privileges!';
        }
    }

    const output = {
        parameters: {
            ...input.data.criteria,
        }
    };

    return output;
};
