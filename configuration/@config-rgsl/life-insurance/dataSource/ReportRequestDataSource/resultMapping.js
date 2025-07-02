'use strict';

const { translationUtils } = require('@adinsure/runtime');

module.exports = function resultMapping(input) {

    return {
        requestNumber: input.REQUEST_NUMBER,
        requestState: translationUtils.getTranslation(
            'dataSource/ReportRequestDataSource/1',
            'enum',
            'requestState',
            input.REQUEST_STATE,
            'ReportRequestDataSourceInputSchema'),
        contractNumber: input.CONTRACT_NUMBER,
        contractStateCode: translationUtils.getTranslation(
            'dataSource/ReportRequestDataSource/1',
            'enum',
            'contractStateCode',
            input.CONTRACT_STATE_CODE,
            'ReportRequestDataSourceInputSchema'),
        productCode: input.PRODUCT_CODE,
        productGroup: translationUtils.getTranslation(
            'dataSource/ReportRequestDataSource/1',
            'enum',
            'productGroup',
            input.PRODUCT_GROUP,
            'ProductGroup'),
        partner: input.PARTNER,
        amount: input.AMOUNT,
        policyHolderName: input.POLICY_HOLDER_NAME,
        applicantName: input.APPLICANT_NAME,
        typeOfRequest: translationUtils.getTranslation(
            'dataSource/ReportRequestDataSource/1',
            'enum',
            'typeOfRequest',
            input.TYPE_OF_REQUEST,
            'ReportRequestDataSourceInputSchema'),
        amendmentReason: translationUtils.getTranslation(
            'dataSource/ReportRequestDataSource/1',
            'enum',
            'amendmentReason',
            input.AMENDMENT_REASON,
            'ReportRequestDataSourceInputSchema'),
        contractIssueDate: input.CONTRACT_ISSUE_DATE,
        requestIssueDate: input.REQUEST_ISSUE_DATE,
        bankName: input.BANK_NAME,
        bankNumber: input.BANK_NUMBER
    };
};
