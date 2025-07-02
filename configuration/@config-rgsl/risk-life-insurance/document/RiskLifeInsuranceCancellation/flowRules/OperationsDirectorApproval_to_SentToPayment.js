const { getValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');
const amendmentUtils = require('@config-rgsl/life-insurance/lib/amendmentUtils');
/* eslint no-undef: "off"*/

/**
 * @errorCode {errorCode} FullPackageReceiveDateIsRequired
 * @errorCode {errorCode} ZeroTotalPaymentAmount
 */

module.exports = function rule(input) {

    let validationErrors = [];

    const body = getValue(input, 'body');
    const fullPackageReceiveDate = getValue(body, 'basicAmendmentConditions.fullPackageReceiveDate');

    const amount = amendmentUtils.calculateTotalCancellationAmount(body)?.total ?? 0;

    if (amount === 0) {

        validationErrors.push({
            errorCode: 'ZeroTotalPaymentAmount'
        });
    }

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
