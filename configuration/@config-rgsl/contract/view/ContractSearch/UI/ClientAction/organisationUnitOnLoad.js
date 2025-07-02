'use strict';

const { getValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');

module.exports = function organisationUnitOnLoad(input) {

    const headOrgUnitCode = getValue(input, 'context.viewContext.headOrgUnit.code');
    const userAdditionalOrgUnits = getValue(input, 'context.viewContext.userAdditionalOrgUnits', []);

    if (headOrgUnitCode || userAdditionalOrgUnits) {
        this.getLookup().setSearchRequest({
            data: {
                criteria: {
                    headOrgUnitCode: headOrgUnitCode,
                    userAdditionalOrgUnits: userAdditionalOrgUnits
                }
            }
        });
        this.getLookup().setProtectedFields([
            'headOrgUnitCode',
            'userAdditionalOrgUnits'
        ]);
    }

    this.getLookup().search();

};
