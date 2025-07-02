module.exports = function isOperationsUser(input, ambientProperties) {
    const currentUserRoles = ambientProperties.applicationContext.currentUser().getUserRoles() || [];
    const isOperationsUser = currentUserRoles.some(item => item.ApplicationRoleCodeName == 'OperationsGroup');
    return isOperationsUser;
};
