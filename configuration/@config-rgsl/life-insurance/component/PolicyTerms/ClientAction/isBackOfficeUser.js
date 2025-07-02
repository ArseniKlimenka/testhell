module.exports = function isBackOfficeUser(input, ambientProperties) {

    if (ambientProperties.configurationCodeName == 'CollectiveLifeInsurancePolicy')
    { return false; }

    const currentUserRoles = ambientProperties.applicationContext.currentUser().getUserRoles() || [];
    const isBackOffice = currentUserRoles.some(item => item.ApplicationRoleCodeName == 'GeneralBackOffice');

    return isBackOffice;

};
