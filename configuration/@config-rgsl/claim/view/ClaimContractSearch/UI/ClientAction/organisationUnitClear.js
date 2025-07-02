'use strict';

module.exports = function organisationUnitClear(input) {

    const organisationUnitCode = input.context?.viewContext?.headOrgUnit?.code;
    const organisationUnitName = input.context?.viewContext?.headOrgUnit?.name;
    const organisationUnitCodes = input.context?.viewContext?.headOrgUnit?.childCodes ?? [];

    input.data.request.data.criteria.organisationUnitCode = organisationUnitCode;
    input.data.request.data.criteria.organisationUnitName = organisationUnitName;
    input.data.request.data.criteria.organisationUnitCodes = organisationUnitCodes;
};
