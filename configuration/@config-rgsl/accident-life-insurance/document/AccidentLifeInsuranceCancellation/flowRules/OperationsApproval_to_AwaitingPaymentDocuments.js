const amendmentUtils = require('@config-rgsl/life-insurance/lib/amendmentUtils');

/**
 * @errorCode {errorCode} FullPackageReceiveDateIsRequired
 * @errorCode {errorCode} ZeroTotalPaymentAmount
 * @errorCode {errorCode} RejectionTextMustBeEmpty
 */

module.exports = function rule(input) {

    const validationErrors = [];

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

    return validationErrors;
};
