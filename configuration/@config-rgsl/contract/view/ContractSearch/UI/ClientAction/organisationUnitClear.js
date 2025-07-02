'use strict';

const { getValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');

module.exports = function organisationUnitClear(input) {

    const organisationUnitCode = getValue(input, 'context.viewContext.headOrgUnit.code', undefined);
    const organisationUnitName = getValue(input, 'context.viewContext.headOrgUnit.name', undefined);
    const organisationUnitCodes = getValue(input, 'context.viewContext.headOrgUnit.childCodes', []);

    input.data.request.data.criteria.organisationUnitCode = organisationUnitCode;
    input.data.request.data.criteria.organisationUnitName = organisationUnitName;
    input.data.request.data.criteria.organisationUnitCodes = organisationUnitCodes;
    input.data.request.data.criteria.partnerCode = undefined;
};
