'use strict';

module.exports = function hideColumnForNonBackOffice(input, ambientProperties) {

    if (input.Dimensions?.contractType == "Policy" || input.Dimensions?.contractType == "Quote") {

        const currentUserRoles = ambientProperties.applicationContext.currentUser().getUserRoles() || [];
        const isBackOffice = currentUserRoles.some(item => item.ApplicationRoleCodeName == 'GeneralBackOffice');

        return !isBackOffice;
    }

    return false;
};
