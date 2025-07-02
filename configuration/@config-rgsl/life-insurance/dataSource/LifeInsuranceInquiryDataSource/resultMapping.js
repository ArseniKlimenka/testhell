'use strict';

const { translationUtils } = require('@adinsure/runtime');

module.exports = function resultMapping(input) {

    this.applicationContext.locale = "ru-RU"; // For RU translations

    const inquiryDepartmentCode = input.INQUIRY_DEPARTMENT_CODE;

    return {

        inquiryNumber: input.INQUIRY_NUMBER,
        inquiryCodeName: input.INQUIRY_CODE_NAME,
        inquiryCreatedOn: input.INQUIRY_CREATED_ON,
        inquiryState: input.INQUIRY_STATE,
        inquiryStateDescription: translationUtils.getTranslation(
            `document/${input.INQUIRY_CODE_NAME}/1`,
            'states',
            null,
            input.INQUIRY_STATE),
        inquiryDepartmentCode: inquiryDepartmentCode,
        inquiryDepartmentCodeDescription: inquiryDepartmentCode ? translationUtils.getTranslation('masterEntity/ApplicationUserGroup/1', 'localized-field', 'name', inquiryDepartmentCode) : '',
        inquiryAssignedOn: input.INQUIRY_ASSIGNED_ON,
        documentNumber: input.DOCUMENT_NUMBER,
        documentCodeName: input.DOCUMENT_CODE_NAME,
        receiveDate: input.RECEIVE_DATE,
        applicantFullName: input.APPLICANT_FULL_NAME,
        contractNumber: input.CONTRACT_NUMBER,
        contractCodeName: input.CONTRACT_CODE_NAME,
        issueDate: input.ISSUE_DATE,
        holderName: input.HOLDER_NAME,
        textOfInquiry: input.TEXT_OF_INQUIRY,
        inquiryErrors: input.INQUIRY_ERRORS,
        requestIncludedInRussianPostRegister: input.INCLUDED_IN_RP_REGISTER,
        inclusionDateRussianPostRegister: input.INCLUSION_DATE_RP_REGISTER

    };
};
