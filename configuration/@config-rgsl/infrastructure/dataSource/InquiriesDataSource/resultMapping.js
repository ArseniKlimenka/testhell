'use strict';

const DateTimeUtils = require('@config-rgsl/infrastructure/lib/DateTimeUtils');
const { translationUtils } = require('@adinsure/runtime');

module.exports = function resultMapping(input) {

    const output = {};

    output.inquiryNumber = input.UNIVERSAL_DOCUMENT_NUMBER;
    output.createdOn = DateTimeUtils.formatDate(input.SYS_CREATED_ON, 'dd.MM.yyyy HH:mm');
    output.updatedOn = DateTimeUtils.formatDate(input.SYS_UPDATED_ON, 'dd.MM.yyyy HH:mm');

    output.state = translationUtils.getTranslation(`document/LifeInsurancePolicyInquiry/1`, 'states', null, input.STATE);
    output.departmentCode = translationUtils.getTranslation(`masterEntity/ApplicationUserGroup/1`, 'localized-field', 'name', input.DEPARTMENT_CODE);

    output.body = JSON.parse(input.BODY);

    return output;

};
