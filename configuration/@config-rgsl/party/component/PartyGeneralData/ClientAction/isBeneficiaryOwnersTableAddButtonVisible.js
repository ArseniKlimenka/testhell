'use strict';

module.exports = function isBeneficiaryOwnersTableAddButtonVisible(input, ambientProperties) {

    const anotherNaturalPersons = input.componentContext.anotherNaturalPersons ?? [];

    const currentUserRoles = ambientProperties.applicationContext.currentUser().getUserRoles() || [];
    const canBeneficiaryOwnerEdit = currentUserRoles.some(item => item.ApplicationRoleCodeName == 'BeneficiaryOwnerEdit');

    return anotherNaturalPersons.length < 4 && canBeneficiaryOwnerEdit;
};
