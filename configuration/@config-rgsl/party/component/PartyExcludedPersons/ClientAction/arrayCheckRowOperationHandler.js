module.exports = function arrayCheckRowOperationHandler(input, ambientProperties) {
    const currentUserRoles = ambientProperties.applicationContext.currentUser().getUserRoles() || [];
    const isBackOffice = currentUserRoles.some(item => item.ApplicationRoleCodeName == 'GeneralBackOffice');

    if (!isBackOffice) {
        return {
            delete: false,
            edit: false
        };
    }

    return true;
};
