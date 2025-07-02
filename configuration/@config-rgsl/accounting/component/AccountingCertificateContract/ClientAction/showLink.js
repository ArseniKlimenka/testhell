'use strict';

module.exports = function showLink(input, ambientProperties) {

    const currentUserRoles = ambientProperties?.applicationContext?.currentUser()?.getUserRoles() || [];
    const isBackOffice = currentUserRoles?.some(item => item.ApplicationRoleCodeName == 'GeneralBackOffice');
    const configurationName = input.componentContext.configurationName;
    const documentNumber = input.componentContext.number;

    return isBackOffice && configurationName && documentNumber;

};
