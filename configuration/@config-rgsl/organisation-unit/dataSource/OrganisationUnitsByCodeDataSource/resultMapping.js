'use strict';

module.exports = function resultMapping(input) {

    const output = {};

    output.orgUnitId = input.ORGANISATION_UNIT_ID;
    output.orgUnitCode = input.ORGANISATION_UNIT_CODE;
    output.parentId = input.PARENT_ID;
    output.orgUnitName = input.NAME;
    output.officeCode = input.CODE;
    output.partnerCode = input.PARTNER_CODE;

    return output;
};
