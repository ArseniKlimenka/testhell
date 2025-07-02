'use strict';

const lifeInsuranceConstants = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');

module.exports = function showInquiriesList(input, ambientProperties) {

    const isCollectivePolicy = ambientProperties.configurationCodeName == lifeInsuranceConstants.productCode.CollectiveLifeInsurancePolicy;

    let isAllowedForRole = false;
    const userRoles = ambientProperties.applicationContext.currentUser().getUserRoles();

    if (userRoles.some(item => item.ApplicationRoleCodeName == 'PostSalesInquiry')) {

        isAllowedForRole = true;
    }

    let isAllowedForContractType = false;
    const contractType = input.context.Dimensions?.contractType;

    if (contractType == 'Quote' || isCollectivePolicy) {

        isAllowedForContractType = true;
    }

    return isAllowedForRole && isAllowedForContractType;
};
