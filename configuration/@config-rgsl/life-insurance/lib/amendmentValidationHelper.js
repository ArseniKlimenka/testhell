'use strict';

const amendmentUtils = require('@config-rgsl/life-insurance/lib/amendmentUtils');
const amendmentConstants = require('@config-rgsl/life-insurance/lib/amendmentConstants');
/* eslint no-undef: "off"*/
/**
 * @errorCode {errorCode} ZeroTotalPaymentAmount
 * @errorCode {errorCode} FullPackageReceiveDateIsRequired
 * @errorCode {errorCode} RequiresAccountingApproval
 * @errorCode {errorCode} OperationsDirectorApprovalIsRequired
 * @errorCode {errorCode} LegalAndComplianceApprovalIsRequired
 */

function validateCancellationPoCreationTransition(input, confName, validationErrors, that) {

    const amount = amendmentUtils.calculateTotalCancellationAmount(input.body)?.total ?? 0;

    if (amount === 0) {

        validationErrors.push({
            errorCode: 'ZeroTotalPaymentAmount'
        });
    }

    const fullPackageReceiveDate = input.body.basicAmendmentConditions?.fullPackageReceiveDate;

    if (!fullPackageReceiveDate) {

        validationErrors.push({
            errorCode: 'FullPackageReceiveDateIsRequired'
        });
    }

    const enrich = documents.getDocumentConfiguration(that.businessContext.configurationCodeName, 1).processEnrichmentsFn;
    enrich(undefined, input.body, ['/paymentAmendmentConditions[GetCancellationRecipientsBankAccounts]']);
    const state = that.businessContext.documentState;
    amendmentUtils.validateCancellationRecipientsBankAccounts(input.body, state, validationErrors);
    amendmentUtils.validateKPK(input, confName, validationErrors);

    if (!input.body.tempTechnicalData) {

        input.body.tempTechnicalData = {};
    }

    if (!input.body.tempTechnicalData.inquiries) {

        input.body.tempTechnicalData.inquiries = [];
    }

    enrich(undefined, input.body, ['/tempTechnicalData/inquiries[SetCancellationInquiries]']);

    const paymentLines = input.body.paymentAmendmentConditions.paymentLines ?? [];
    const pitLine = paymentLines.find(item => item.paymentLineType === amendmentConstants.amendmentPaymentLineType.pit);
    const pitSum = pitLine?.paymentLineSumInRub ?? 0;
    const inquiries = input.body.tempTechnicalData.inquiries ?? [];

    if (pitSum > 0) {

        const approvedAccountingIquiry = getLatestDepartmentInquiry(inquiries, 'accounting');

        if (approvedAccountingIquiry?.stateCode !== "Issued") {

            validationErrors.push({
                errorCode: 'RequiresAccountingApproval'
            });
        }
    }

    const directorInquiry = getLatestDepartmentInquiry(inquiries, 'operationsDirector');

    if (directorInquiry?.stateCode !== "Issued") {

        validationErrors.push({
            errorCode: 'OperationsDirectorApprovalIsRequired'
        });
    }

    enrich(undefined, input.body, ['/paymentAmendmentConditions[GetPartiesInfo]']);
    const paticipantsData = input.body.technicalData.partiesInfo;
    let hasNonResident = false;

    const recipients = input.body.paymentAmendmentConditions.canellationRecipients ?? [];
    recipients.forEach(item => {

        const paticipantData = paticipantsData.find(i => i.code === item.partyCode);

        if (paticipantData.isNonResident) {

            hasNonResident = true;
        }
    });

    if (hasNonResident) {

        const legalInquiry = getLatestDepartmentInquiry(inquiries, 'legal');
        const complianceInquiry = getLatestDepartmentInquiry(inquiries, 'compliance');

        if (legalInquiry?.stateCode !== "Issued" || complianceInquiry?.stateCode !== "Issued") {

            validationErrors.push({
                errorCode: 'LegalAndComplianceApprovalIsRequired'
            });
        }
    }
}

function validatePaymentCalculation(input, validationErrors) {
    const paymentLines = input.body.paymentCalculation?.paymentLines;
    const totalSum = paymentLines?.reduce((acc, v) => { acc += v.paymentLineSum; return acc; }, 0);

    if (totalSum === 0) {

        validationErrors.push({
            errorCode: 'PaymentLinesTotalSumMustBeGreaterThanZero'
        });
    }
}

function getLatestDepartmentInquiry(inquiries, departmentCode) {

    const initialInquiries = inquiries ?? [];
    const filteredInquiries = initialInquiries.filter(i => i.departmentCodeName === departmentCode);
    const sortedInquiries = filteredInquiries.sort(function (a, b) { return new Date(b.updatedOn).getTime() - new Date(a.updatedOn).getTime(); });

    return sortedInquiries[0];
}

function validateFundStatus(input, fundStatus, errorCode, validationErrors, that) {
    const enrich = documents.getDocumentConfiguration(that.businessContext.configurationCodeName, 1).processEnrichmentsFn;
    enrich(undefined, input.body, ['[GetLastFundStatus]']);
    const lastFundStatus = input.body.technicalData?.lastFundStatus;

    if (lastFundStatus !== fundStatus) {
        validationErrors.push({
            errorCode
        });
    }
}

module.exports = {
    validateCancellationPoCreationTransition,
    validatePaymentCalculation,
    validateFundStatus
};
