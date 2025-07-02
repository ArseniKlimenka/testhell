'use strict';

const { checkAvailabilitySome } = require('@config-rgsl/infrastructure/lib/ArrayUtilsImpl');

module.exports = function investmentProfitTabVisibility(input, ambientProperties) {

    const currentUserRoles = ambientProperties.applicationContext.currentUser().getUserRoles() || [];
    const roleCodes = currentUserRoles.map(item => item.ApplicationRoleCodeName.trim());

    const isInvestmentProfitAvailable = checkAvailabilitySome([
        'GeneralBackOffice',
        'InvestmentProfitSpecialist'
    ], roleCodes);

    return isInvestmentProfitAvailable;

};
