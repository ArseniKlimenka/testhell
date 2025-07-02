const { documentRoles } = require('@config-rgsl/life-insurance/lib/lifeInsuranceRequestConstants');

module.exports = function showLink(input, ambientProperties) {

    const currentUserRoles = ambientProperties.applicationContext.currentUser().getUserRoles() || [];
    const isBackOffice = currentUserRoles.some(item => item.ApplicationRoleCodeName == documentRoles.GeneralBackOffice);
    const isOperations = currentUserRoles.some(item => item.ApplicationRoleCodeName == documentRoles.Operations);
    const configurationName = input.context.Body.contract?.configurationName;
    const documentNumber = input.context.Body.contract?.number;

    return (isBackOffice || isOperations) && configurationName && documentNumber;

};
