'use strict';

module.exports = function initiatorOnLoad(input) {

    const context = this.getLookup().getContext().viewContext;

    context.additionalProtectedFields = [
        'orgUnitsToFilterBy'
    ];

    const orgUnits = input.context.Body.availableOrgUnits || [];
    const orgUnitCodes = orgUnits.map(u => u.value.code);
    const searchCriteria = {
        orgUnitsToFilterBy: orgUnitCodes
    };

    this.getLookup().setSearchRequest({
        data: {
            criteria: searchCriteria
        }
    });

    this.getLookup().search();
};
