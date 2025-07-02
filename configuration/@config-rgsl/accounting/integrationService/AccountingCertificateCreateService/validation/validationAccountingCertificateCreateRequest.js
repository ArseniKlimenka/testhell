'use strict';

/**
 * @errorCode {errorCode} applicantFullNameIsEmpty
 * @errorCode {errorCode} amountOfPremiumsPaidIsEmpty
 * @errorCode {errorCode} taxPayerDataPartyCodeIsEmpty
 * @errorCode {errorCode} insuredPersonDataPartyCodeIsEmpty
 */

module.exports = function validationAccountingCertificateCreateRequest(input) {

    const validationErrors = [];

    if (input.accountingCertificateNumber) {
        return validationErrors;
    }

    if (!input.isApplicantPolicyHolder && (!input.applicantFullName || input.applicantFullName === "")) {
        validationErrors.push({
            errorCode: "applicantFullNameIsEmpty"
        });
    }

    if (input.paymentContract?.isManualCorrectionSum && !input.paymentContract?.amountOfPremiumsPaid) {
        validationErrors.push({
            errorCode: "amountOfPremiumsPaidIsEmpty"
        });
    }

    if (!input.taxPayerData?.isTaxPayerPolicyHolder && !input.taxPayerData?.partyCode) {
        validationErrors.push({
            errorCode: "taxPayerDataPartyCodeIsEmpty"
        });
    }

    if (!input.insuredPersonData?.isTaxPayerInsuredPerson && !input.insuredPersonData?.partyCode) {
        validationErrors.push({
            errorCode: "insuredPersonDataPartyCodeIsEmpty"
        });
    }

    return validationErrors;
};
