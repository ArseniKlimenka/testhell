'use strict';

const { businessClock, translationUtils } = require('@adinsure/runtime');

module.exports = function resultMapping(input) {

    const output = {};

    output.inquiryNumber = input.UNIVERSAL_DOCUMENT_NUMBER;
    output.createdOn = businessClock.convertFromBusinessTimeToUTC(input.SYS_CREATED_ON);
    output.updatedOn = businessClock.convertFromBusinessTimeToUTC(input.SYS_UPDATED_ON);
    output.stateCode = input.STATE;
    output.state = translationUtils.getTranslation(`document/CancellationInquiry/1`, 'states', null, input.STATE);
    output.departmentCodeName = input.DEPARTMENT_CODE;
    output.departmentCodeDescription = translationUtils.getTranslation(`masterEntity/ApplicationUserGroup/1`, 'localized-field', 'name', input.DEPARTMENT_CODE);

    return output;

};
