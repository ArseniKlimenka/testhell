'use strict';

const { messages } = require('@config-rgsl/accounting/lib/accountingCertificateHelper');

const emptyText = '';

module.exports = function resultMapping(input) {

    const result = input.data.map(item => {

        return {
            accountingCertificateNumber: item.resultData.accountingCertificateNumber ?? emptyText,
            accountingCertificateStateDescription: item.resultData.accountingCertificateStateDescription ? item.resultData.accountingCertificateStateDescription : emptyText,
            contractNumber: item.resultData.contractNumber ? item.resultData.contractNumber : emptyText,
            applicantFullName: item.resultData.applicantFullName ? item.resultData.applicantFullName : emptyText,
            requestDate: item.resultData.requestDate ? item.resultData.requestDate : emptyText,
            accountingYear: item.resultData.accountingYear ? item.resultData.accountingYear : emptyText,
            correctionNumber: item.resultData.correctionNumber ? item.resultData.correctionNumber : emptyText,
            amountOfPremiumPaid: item.resultData.amountOfPremiumPaid ? item.resultData.amountOfPremiumPaid : emptyText,
            certificateIssueDate: item.resultData.certificateIssueDate ? item.resultData.certificateIssueDate : emptyText,
            hasAttachment: item.resultData.hasAttachment ? messages.Yes : messages.No,
            transitionCommitor: item.resultData.transitionCommitor ? item.resultData.transitionCommitor : emptyText,
        };
    });


    return result;
};
