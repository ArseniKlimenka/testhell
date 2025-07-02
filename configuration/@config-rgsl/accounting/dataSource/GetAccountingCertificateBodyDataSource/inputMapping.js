'use strict';

module.exports = function (input) {

    const output = {};
    output.parameters = {};
    output.parameters.accountingCertificateNumber = null;
    output.parameters.accountingCertificateState = null;
    output.parameters.accountingCertificateStates = null;
    output.parameters.accountingCertificateSeqNumber = null;
    output.parameters.originalDocumentNumber = null;
    output.parameters.contractNumber = null;
    output.parameters.holderPartyCode = null;
    output.parameters.insuredPartyCode = null;
    output.parameters.applicantFullName = null;
    output.parameters.requestDate = null;
    output.parameters.requestDateFrom = null;
    output.parameters.requestDateTo = null;
    output.parameters.accountingYear = null;
    output.parameters.correctionNumber = null;
    output.parameters.amountOfPremiumPaid = null;
    output.parameters.certificateIssueDate = null;
    output.parameters.accountingCertificateNumbers = null;

    if (input.data.criteria.accountingCertificateNumber) {

        output.parameters.accountingCertificateNumber = input.data.criteria.accountingCertificateNumber;
    }

    if (input.data.criteria.accountingCertificateState) {

        output.parameters.accountingCertificateState = input.data.criteria.accountingCertificateState;
    }

    if (input.data.criteria.accountingCertificateStates) {

        output.parameters.accountingCertificateStates = input.data.criteria.accountingCertificateStates;
    }

    if (input.data.criteria.accountingCertificateSeqNumber) {

        output.parameters.accountingCertificateSeqNumber = input.data.criteria.accountingCertificateSeqNumber;
    }

    if (input.data.criteria.originalDocumentNumber) {

        output.parameters.originalDocumentNumber = input.data.criteria.originalDocumentNumber;
    }

    if (input.data.criteria.contractNumber) {

        output.parameters.contractNumber = input.data.criteria.contractNumber;
    }

    if (input.data.criteria.holderPartyCode) {

        output.parameters.holderPartyCode = input.data.criteria.holderPartyCode;
    }

    if (input.data.criteria.insuredPartyCode) {

        output.parameters.insuredPartyCode = input.data.criteria.insuredPartyCode;
    }

    if (input.data.criteria.applicantFullName) {

        output.parameters.applicantFullName = input.data.criteria.applicantFullName;
    }

    if (input.data.criteria.requestDateFrom) {
        output.parameters.requestDateFrom = input.data.criteria.requestDateFrom;
    }

    if (input.data.criteria.requestDateTo) {
        output.parameters.requestDateTo = input.data.criteria.requestDateTo;
    }

    if (input.data.criteria.accountingYear) {

        output.parameters.accountingYear = input.data.criteria.accountingYear;
    }

    if (input.data.criteria.correctionNumber) {

        output.parameters.correctionNumber = input.data.criteria.correctionNumber;
    }

    if (input.data.criteria.amountOfPremiumPaid) {

        output.parameters.amountOfPremiumPaid = input.data.criteria.amountOfPremiumPaid;
    }

    if (input.data.criteria.certificateIssueDate) {

        output.parameters.certificateIssueDate = input.data.criteria.certificateIssueDate;
    }

    if (input.data.criteria.accountingCertificateNumbers) {

        output.parameters.accountingCertificateNumbers = input.data.criteria.accountingCertificateNumbers;
    }

    return output;
};
