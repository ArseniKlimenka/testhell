'use strict';

const lifeInsuranceConstants = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');
const { rolesAllowedToEconomicParameters } = require('@config-rgsl/life-insurance/lib/economicParametersHelper');

module.exports = function economicParametersEndowmentInvestmentShow(input, ambientProperties) {

    const currentUserRoles = ambientProperties.applicationContext.currentUser().getUserRoles() || [];
    const isAllowedRoles = currentUserRoles.some(item => rolesAllowedToEconomicParameters.includes(item.ApplicationRoleCodeName));

    const insuranceProduct = input.context?.Body?.mainConditions?.insuranceProduct ?? {};
    const productGroup = insuranceProduct?.productGroup;
    const isCorrectGroup = [lifeInsuranceConstants.productGroup.NSZ.descriptionRU, lifeInsuranceConstants.productGroup.ISZ.descriptionRU].includes(productGroup);
    const isMigrated = insuranceProduct?.isMigrated;

    return isAllowedRoles && isCorrectGroup && !isMigrated;
};
