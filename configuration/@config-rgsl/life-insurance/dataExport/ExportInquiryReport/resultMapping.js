'use strict';

const { getValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');
const { translationUtils } = require('@adinsure/runtime');
const emptyText = '';

module.exports = function resultMapping(input) {

    this.applicationContext.locale = "ru-RU"; // For RU translations

    const result = input.data.map(item => {

        const i = item.resultData;

        return {
            inquiryNumber: getValue(i, 'inquiryNumber', emptyText),
            inquiryCodeName: getValue(i, 'inquiryCodeName', emptyText),
            inquiryCreatedOn: getValue(i, 'inquiryCreatedOn', emptyText),
            inquiryState: getValue(i, 'inquiryState', emptyText),
            inquiryStateDescription: i.inquiryState ? translationUtils.getTranslation(
                'document/LifeInsuranceRequest/1',
                'states',
                null,
                i.inquiryState) : emptyText,
            inquiryDepartmentCode: getValue(i, 'inquiryDepartmentCode', emptyText),
            inquiryDepartmentCodeDescription: i.inquiryDepartmentCode ? translationUtils.getTranslation('masterEntity/ApplicationUserGroup/1', 'localized-field', 'name', i.inquiryDepartmentCode) : emptyText,
            inquiryAssignedOn: getValue(i, 'inquiryAssignedOn', emptyText),
            documentNumber: getValue(i, 'documentNumber', emptyText),
            documentCodeName: getValue(i, 'documentCodeName', emptyText),
            receiveDate: getValue(i, 'receiveDate', emptyText),
            applicantFullName: getValue(i, 'applicantFullName', emptyText),
            contractNumber: getValue(i, 'contractNumber', emptyText),
            contractCodeName: getValue(i, 'contractCodeName', emptyText),
            issueDate: getValue(i, 'issueDate', emptyText),
            holderName: getValue(i, 'holderName', emptyText),
            textOfInquiry: getValue(i, 'textOfInquiry', emptyText),
            inquiryErrors: getValue(i, 'inquiryErrors', emptyText),
            requestIncludedInRussianPostRegister: getValue(i, 'requestIncludedInRussianPostRegister', emptyText),
            inclusionDateRussianPostRegister: getValue(i, 'inclusionDateRussianPostRegister', emptyText),
        };
    });

    return result;
};
