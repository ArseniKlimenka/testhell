const { documentRoles } = require('@config-rgsl/life-insurance/lib/lifeInsuranceRequestConstants');

module.exports = function historyTabVisibility(input, ambientProperties) {

    const isSaved = input.context.IsSaved;
    const currentUserRoles = ambientProperties.applicationContext.currentUser().getUserRoles() || [];
    const isBackOffice = currentUserRoles.some(item => item.ApplicationRoleCodeName == documentRoles.GeneralBackOffice);
    const isOperations = currentUserRoles.some(item => item.ApplicationRoleCodeName == documentRoles.Operations);

    return isSaved && (isBackOffice || isOperations);

};
