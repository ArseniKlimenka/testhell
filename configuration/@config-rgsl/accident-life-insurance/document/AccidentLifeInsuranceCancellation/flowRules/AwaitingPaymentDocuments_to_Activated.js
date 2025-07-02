const amendmentUtils = require('@config-rgsl/life-insurance/lib/amendmentUtils');
/* eslint no-undef: "off"*/

/**
 * @errorCode {errorCode} FullPackageReceiveDateIsRequired
 * @errorCode {errorCode} NonZeroTotalPaymentAmount
 * @errorCode {errorCode} RejectionTextMustBeEmpty
 */

module.exports = function rule(input) {

    let validationErrors = [];

    const rejectionText = input.body.basicAmendmentConditions?.rejectionText;

    if (rejectionText) {

        validationErrors.push({
            errorCode: 'RejectionTextMustBeEmpty'
        });
    }

    const body = input.body;
    const contractVersions = body?.contractVersions ?? [];
    const latestContractVersion = contractVersions.sort((a, b) => b.seqNumber - a.seqNumber)[0];

    const amount = amendmentUtils.calculateTotalCancellationAmount(body)?.total ?? 0;

    if (amount !== 0) {

        validationErrors.push({
            errorCode: 'NonZeroTotalPaymentAmount'
        });
    }

    const fullPackageReceiveDate = body?.basicAmendmentConditions?.fullPackageReceiveDate;

    if (!fullPackageReceiveDate) {

        validationErrors.push({
            errorCode: 'FullPackageReceiveDateIsRequired'
        });
    }

    const enrich = documents.getDocumentConfiguration(this.businessContext.configurationCodeName, 1).processEnrichmentsFn;
    enrich(undefined, input.body, ['/paymentAmendmentConditions[GetCancellationRecipientsBankAccounts]']);
    const state = this.businessContext.documentState;
    amendmentUtils.validateCancellationRecipientsBankAccounts(body, state, validationErrors);
    validationErrors = validationErrors.filter(e => e.severity !== 'Warning');

    return validationErrors;
};
