'use strict';

module.exports = function resultMapping(input) {

    const output = {};

    output.code = input.ORGANISATION_UNIT_CODE;
    output.name = input.NAME;
    output.officeCode = input.CODE;
    output.id = input.ORGANISATION_UNIT_ID;
    output.businessCode = input.BUSINESS_CODE;

    if (input.PARENT_ID) {
        output.parentId = input.PARENT_ID;
    }

    if (input.PARTNER_CODE) {
        output.partnerCode = input.PARTNER_CODE;
    }

    return output;

};
