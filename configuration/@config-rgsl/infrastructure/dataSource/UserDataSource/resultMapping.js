'use strict';

const { nullCheck } = require('@config-rgsl/infrastructure/lib/ObjectUtils');

module.exports = function resultMapping(input) {

    const output = {};

    output.userId = input.APPLICATION_USER_ID;
    output.userName = input.USERNAME;
    output.partyCode = input.PARTY_CODE;
    output.partyFullName = input.PARTY_FULL_NAME;
    output.employeeCode = input.EMPLOYEE_CODE;
    output.organisationUnitCode = input.ORGANISATION_UNIT_CODE;
    output.organisationUnitName = input.ORGANISATION_UNIT_NAME;
    output.visibilityType = input.VISIBILITY_TYPE;
    output.partnerCode = input.PARTNER_CODE;
    output.partnerDescription = input.PARTNER_DESCRIPTION;
    output.partnerShortDescription = input.PARTNER_SHORT_DESCRIPTION;
    output.partnerBusinessCode = input.PARTNER_BUSINESS_CODE;
    output.partnerType = input.PARTNER_TYPE;
    output.actualEmail = nullCheck(input.ACTUAL_EMAIL);
    output.sadNumber = input.SAD_NUMBER;

    return output;

};
