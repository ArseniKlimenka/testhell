'use strict';

const { salesSegmentRoles } = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');

module.exports = function productGroupFilter(input, ambientProperties) {

    let items = input.items;

    // filter abailable for user product groups
    const availableProductGroups = [];
    const userRoles = ambientProperties.applicationContext.currentUser().getUserRoles();
    userRoles
        .forEach(role => Object.keys(salesSegmentRoles)
            .forEach(segment => Object.keys(salesSegmentRoles[segment])
                .forEach(group => {
                    if (salesSegmentRoles[segment][group].includes(role.ApplicationRoleCodeName)) {
                        availableProductGroups.push(group);
                    }
                })));

    items = items.filter(item => availableProductGroups.includes(item));

    return items;

};
