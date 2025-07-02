'use strict';

const { translationUtils } = require('@adinsure/runtime');

module.exports = function resultMapping(input) {

    const output = {};

    output.inquiryId = input.UNIVERSAL_DOCUMENT_ID;
    output.inquiryNumber = input.UNIVERSAL_DOCUMENT_NUMBER;
    output.createdOn = input.SYS_CREATED_ON;
    output.updatedOn = input.SYS_UPDATED_ON;
    output.stateCode = input.STATE;
    output.state = translationUtils.getTranslation(`document/CancellationInquiry/1`, 'states', null, input.STATE);
    output.departmentCodeName = input.DEPARTMENT_CODE;
    output.departmentCodeDescription = translationUtils.getTranslation(`masterEntity/ApplicationUserGroup/1`, 'localized-field', 'name', input.DEPARTMENT_CODE);
    output.changedByUser = input.CHANGED_BY_USER;
    output.changedByParty = input.CHANGED_BY_PARTY;
    output.changedByPartyCode = input.CHANGED_BY_PARTY_CODE;
    output.changedOn = input.CHANGED_ON;
    output.textOfInquiry = input.TEXT_OF_INQUIRY;
    output.textOfAnswer = input.TEXT_OF_ANSWER;
    output.textOfComment = input.TEXT_OF_COMMENT;

    return output;
};
