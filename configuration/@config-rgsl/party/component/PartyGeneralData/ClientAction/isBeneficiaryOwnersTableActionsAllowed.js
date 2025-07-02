'use strict';

module.exports = function isBeneficiaryOwnersTableActionsAllowed(input, ambientProperties) {

    const currentUserRoles = ambientProperties.applicationContext.currentUser().getUserRoles() || [];
    const canBeneficiaryOwnerEdit = currentUserRoles.some(item => item.ApplicationRoleCodeName == 'BeneficiaryOwnerEdit');

    return {
        delete: canBeneficiaryOwnerEdit,
        edit: canBeneficiaryOwnerEdit
    };
};
