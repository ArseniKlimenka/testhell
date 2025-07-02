module.exports = function showGroupTabs(input, ambientProperties) {

    const currentUserGroups = ambientProperties.applicationContext.currentUser().getUserGroups() || [];
    const currentUserRoles = ambientProperties.applicationContext.currentUser().getUserRoles() || [];

    const isBackOffice = currentUserRoles.some(item => item.ApplicationRoleCodeName == 'GeneralBackOffice');
    const isGroupManager = currentUserGroups.some(item => item.IsGroupManager == true);

    return isGroupManager || isBackOffice;

};
