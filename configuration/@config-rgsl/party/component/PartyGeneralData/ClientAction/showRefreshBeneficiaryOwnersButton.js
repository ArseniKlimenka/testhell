"use strict";

const { documentRoles } = require('@config-rgsl/life-insurance/lib/lifeInsuranceRequestConstants');

module.exports = function showRefreshBeneficiaryOwnersButton(input, ambientProperties) {

    const currentUserRoles = ambientProperties.applicationContext.currentUser().getUserRoles() || [];
    const canBeneficiaryOwnerEdit = currentUserRoles.some(item => item.ApplicationRoleCodeName == documentRoles.BeneficiaryOwnerEdit);

    return canBeneficiaryOwnerEdit;
};
