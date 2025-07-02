'use strict';

const { translationUtils } = require('@adinsure/runtime');

module.exports = function resultMapping(input) {

    const output = {};

    output.accountingCertificateNumber = input.UNIVERSAL_VERSIONED_DOCUMENT_NUMBER;
    output.accountingCertificateState = input.STATE;
    output.accountingCertificateSeqNumber = input.SEQ_NUMBER;
    output.accountingCertificateStateDescription = translationUtils.getTranslation(
        'document/AccountingCertificate/1',
        'states',
        null,
        input.STATE),
    output.accountingCertificateConfigurationName = input.CERTIFICATE_CONFIGURATION_NAME;
    output.originalDocumentNumber = input.ORIGINAL_DOCUMENT_NUMBER;
    output.contractNumber = input.CONTRACT_NUMBER;
    output.contractCodeName = input.CONTRACT_CODE_NAME;
    output.applicantFullName = input.APPLICANT_FULL_NAME;
    output.requestDate = input.REQUEST_DATE;
    output.accountingYear = input.ACCOUNTING_YEAR;
    output.correctionNumber = input.CORRECTION_NUMBER;
    output.amountOfPremiumPaid = input.AMOUNT_OF_PREMIUMS_PAID;
    output.certificateIssueDate = input.CERTIFICATE_ISSUE_DATE;
    output.incomeSource = translationUtils.getTranslation(
        'dataSource/GetAccountingCertificateDataSource/1',
        'enum',
        'accountingCertificateIncomeSourceComponent',
        input.INCOME_SOURCE?.toString(),
        'AccountingCertificateIncomeSourceComponent');

    output.taxCertificateFormat = input.TAX_CERTIFICATE_FORMAT;
    output.hasAttachment = input.HAS_ATTACHMENT;
    output.transitionCommitor = input.TRANSITION_COMMITIOR;

    return output;
};
