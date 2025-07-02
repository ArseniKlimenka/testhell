'use strict';

module.exports = function organisationUnitOnLoad(input) {

    const headOrgUnitCode = input.context?.viewContext?.headOrgUnit?.code;
    const userAdditionalOrgUnits = input.context?.viewContext?.userAdditionalOrgUnits ?? [];

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
