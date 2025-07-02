'use strict';

module.exports = function showInitiator(input, ambientProperties) {

    const currentUserRoles = ambientProperties.applicationContext.currentUser().getUserRoles() || [];
    const isBackOffice = currentUserRoles.some(item => item.ApplicationRoleCodeName == 'GeneralBackOffice');
    const isAllowInitiatorChange = currentUserRoles.some(item => item.ApplicationRoleCodeName == 'AllowInitiatorChangeOAS');

    return isBackOffice || isAllowInitiatorChange;

};
