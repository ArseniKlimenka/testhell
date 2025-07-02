module.exports = function showExportTotalAmounts(input, ambientProperties) {

    const currentUserRoles = ambientProperties.applicationContext.currentUser().getUserRoles() || [];
    const isSMGO = currentUserRoles.some(item => item.ApplicationRoleCodeName == 'SMGO');

    return isSMGO;

};
