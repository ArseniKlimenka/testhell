'use strict';

const { checkAvailabilitySome } = require('@config-rgsl/infrastructure/lib/ArrayUtilsImpl');

module.exports = function reinsuranceTabVisibility(input, ambientProperties) {

    const currentUserRoles = ambientProperties.applicationContext.currentUser().getUserRoles() || [];
    const roleCodes = currentUserRoles.map(item => item.ApplicationRoleCodeName.trim());

    const isReinsuranceAvailable = checkAvailabilitySome([
        'GeneralBackOffice',
        'SeniorReinsuranceSpecialist',
        'ReinsuranceCommon',
        'ReinsuranceSpecialist'
    ], roleCodes);

    return isReinsuranceAvailable;

};
