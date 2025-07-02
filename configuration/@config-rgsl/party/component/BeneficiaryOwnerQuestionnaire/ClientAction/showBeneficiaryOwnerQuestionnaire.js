'use strict';

module.exports = function showBeneficiaryOwnerQuestionnaire(input, ambientProperties) {

    const currentUserRoles = ambientProperties.applicationContext.currentUser().getUserRoles() || [];

    return currentUserRoles.some(item => item.ApplicationRoleCodeName == 'BeneficiaryOwnerEdit');
};
