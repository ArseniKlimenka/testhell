'use strict';

const { validateEndowmentBeneficiaryBankAccounts } = require('@config-rgsl/claim-base/lib/claimValidationHelper');
const { calculateTotalEndowmentAmount } = require('@config-rgsl/claim-base/lib/claimGeneralHelper');
const { claimConfigurantionNames, endowmentInquiryStates, claimUserGroups } = require('@config-rgsl/claim-base/lib/claimConsts');
/* eslint no-undef: "off"*/

/**
 * @errorCode {errorCode} ZeroTotalPaymentAmount
 * @errorCode {errorCode} RejectionMustBeEmpty,
 * @errorCode {errorCode} RejectionNoteMustBeEmpty
 * @errorCode {errorCode} AtleastOneBeneficiaryIsRequired
 * @errorCode {errorCode} OperationsDirectorApprovalIsRequired
 * @errorCode {errorCode} LegalAndComplianceApprovalIsRequired
 */

module.exports = function rule(input) {

    const validationErrors = [];

    const totalAmount = calculateTotalEndowmentAmount(input.body);

    if (totalAmount.amountInRubCurrency < 0) {

        validationErrors.push({
            errorCode: 'ZeroTotalPaymentAmount'
        });
    }

    const rejectionReason = input.body.mainAttributes?.rejectionReason;

    if (rejectionReason) {

        validationErrors.push({
            errorCode: 'RejectionMustBeEmpty',
            errorDataPath: '/Body/mainAttributes/rejectionReason'
        });
    }

    const rejectionNote = input.body.mainAttributes?.rejectionNote;

    if (rejectionNote) {

        validationErrors.push({
            errorCode: 'RejectionNoteMustBeEmpty',
            errorDataPath: '/Body/mainAttributes/rejectionNote'
        });
    }

    const beneficaries = input.body.endowmentBeneficiaries ?? [];

    if (beneficaries.length === 0) {

        validationErrors.push({
            errorCode: 'AtleastOneBeneficiaryIsRequired'
        });
    }

    const enrich = documents.getDocumentConfiguration(claimConfigurantionNames.endowment, 1).processEnrichmentsFn;
    enrich(undefined, input.body, ['[GetBeneficiariesBankAccounts]']);
    const state = this.businessContext.documentState;
    validateEndowmentBeneficiaryBankAccounts(input.body, state, validationErrors);

    enrich(undefined, input.body, ['[SetEndowmentInquiries]']);
    enrich(undefined, input.body, ['[GetPolicyParties]']);
    enrich(undefined, input.body, ['[GetParticipantsData]']);

    const inquiries = input.body.tempTechnicalData.inquiries ?? [];

    const directorInquiry = getLatestDepartmentInquiry(inquiries, claimUserGroups.operationsDirector);

    if (directorInquiry?.stateCode !== endowmentInquiryStates.issued) {

        validationErrors.push({
            errorCode: 'OperationsDirectorApprovalIsRequired'
        });
    }

    const paticipantsData = input.body.tempTechnicalData.paticipantsData ?? [];
    let hasNonResident = false;

    beneficaries.forEach(item => {

        const paticipantData = paticipantsData.find(i => i.code === item.partyCode);

        if (paticipantData.isNonResident) {

            hasNonResident = true;
        }
    });

    if (hasNonResident || totalAmount.amountInRubCurrency > 1000000) {

        const legalInquiry = getLatestDepartmentInquiry(inquiries, claimUserGroups.legal);
        const complianceInquiry = getLatestDepartmentInquiry(inquiries, claimUserGroups.compliance);

        if (legalInquiry?.stateCode !== endowmentInquiryStates.issued ||
            complianceInquiry?.stateCode !== endowmentInquiryStates.issued) {

            validationErrors.push({
                errorCode: 'LegalAndComplianceApprovalIsRequired'
            });
        }
    }

    return validationErrors;
};

function getLatestDepartmentInquiry(inquiries, departmentCode) {

    const initialInquiries = inquiries ?? [];
    const filteredInquiries = initialInquiries.filter(i => i.departmentCodeName === departmentCode);
    const sortedInquiries = filteredInquiries
        .sort(function (a, b) { return new Date(b.updatedOn).getTime() - new Date(a.updatedOn).getTime(); });

    return sortedInquiries[0];
}
