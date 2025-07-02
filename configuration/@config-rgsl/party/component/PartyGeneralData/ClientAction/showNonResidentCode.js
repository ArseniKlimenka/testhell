module.exports = function showNonResidentCode(input, ambientProperties) {

    const hasAccountingGroup = ambientProperties.applicationContext
        .currentUser()
        .getUserRoles()
        .map(x => x.UserGroupCodes)
        .filter(x => x == 'accounting')
        .length > 0;

    return input.componentContext.noTIN && hasAccountingGroup;
};
