module.exports = function arrayCheckRowOperationHandler(input, ambientProperties) {
    const { affectedRow } = input;

    const currentUserRoles = ambientProperties.applicationContext.currentUser().getUserRoles() || [];
    const isBackOffice = currentUserRoles.some(item => item.ApplicationRoleCodeName == 'GeneralBackOffice');

    if (!isBackOffice && !affectedRow.docType.allowToSalers) {
        return {
            delete: false,
            edit: false
        };
    }

    return true;
};
