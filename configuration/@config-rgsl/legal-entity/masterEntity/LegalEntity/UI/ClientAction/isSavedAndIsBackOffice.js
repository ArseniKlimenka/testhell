module.exports = function isSavedAndIsBackOffice(input, ambientProperties) {

    const isSaved = input.context.IsSaved;
    const currentUserRoles = ambientProperties.applicationContext.currentUser().getUserRoles() || [];
    const isBackOffice = currentUserRoles.some(item => item.ApplicationRoleCodeName == 'GeneralBackOffice');

    return isSaved && isBackOffice;

};
