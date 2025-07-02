'use strict';

module.exports = function showPartyHistoryChanges(input, ambientProperties) {

    const userRoles = ambientProperties.applicationContext.currentUser().getUserRoles();
    const result = userRoles.some(item => item.ApplicationRoleCodeName === 'GeneralBackOffice');

    return result;
};
