const amendmentUtils = require('@config-rgsl/life-insurance/lib/amendmentUtils');
/* eslint no-undef: "off"*/

/**
 * @errorCode {errorCode} RejectionTextMustBeEmpty
 * @errorCode {errorCode} ZeroTotalPaymentAmount,
 * @errorCode {errorCode} AtleastOneRecipientIsRequired
 * @errorCode {errorCode} FullPackageReceiveDateIsRequired
 */

module.exports = function rule(input) {

    let validationErrors = [];

    const fullPackageReceiveDate = input.body.basicAmendmentConditions?.fullPackageReceiveDate;

    if (!fullPackageReceiveDate) {

        validationErrors.push({
            errorCode: 'FullPackageReceiveDateIsRequired'
        });
    }

    const rejectionText = input.body.basicAmendmentConditions?.rejectionText;

    if (rejectionText) {

        validationErrors.push({
            errorCode: 'RejectionTextMustBeEmpty'
        });
    }

    const amount = amendmentUtils.calculateTotalCancellationAmount(input.body)?.total ?? 0;

    if (amount === 0) {

        validationErrors.push({
            errorCode: 'ZeroTotalPaymentAmount'
        });
    }

    const recipients = input.body.paymentAmendmentConditions?.canellationRecipients ?? 0;

    if (recipients.length === 0) {

        validationErrors.push({
            errorCode: 'AtleastOneRecipientIsRequired'
        });
    }

    const enrich = documents.getDocumentConfiguration(this.businessContext.configurationCodeName, 1).processEnrichmentsFn;
    enrich(undefined, input.body, ['/paymentAmendmentConditions[GetCancellationRecipientsBankAccounts]']);
    const state = this.businessContext.documentState;

    amendmentUtils.validateCancellationRecipientsBankAccounts(input.body, state, validationErrors);
    amendmentUtils.validateKPK(input, 'RiskLifeInsuranceCancellation', validationErrors);
    validationErrors = validationErrors.filter(e => e.severity !== 'Warning');

    return validationErrors;
};
