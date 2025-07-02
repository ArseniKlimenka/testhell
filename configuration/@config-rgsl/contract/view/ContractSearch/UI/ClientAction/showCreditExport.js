module.exports = function showCreditExport(input, ambientProperties) {

    const currentUserRoles = ambientProperties.applicationContext.currentUser().getUserRoles() || [];
    const isAllowExportCredit = currentUserRoles.some(item => item.ApplicationRoleCodeName == 'AllowExportCredit');

    return isAllowExportCredit;

};
