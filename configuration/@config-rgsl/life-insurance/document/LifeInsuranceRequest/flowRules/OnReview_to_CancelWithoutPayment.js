const { checkCancellation } = require('@config-rgsl/life-insurance/lib/lifeInsuranceRequestFlowRulesHelper');

/**
 * @errorCode {errorCode} OnReview_ForCancellationOnly
 * @errorCode {errorCode} OnReview_to_CancelWithoutPayment_CreditRepaymentOnly
 * @errorCode {errorCode} PolicyShouldBeActivated
 * @errorCode {errorCode} PolicyAmendmentsNotInCompletedStatus
 */

module.exports = function rule(input) {

    const validationErrors = [];

    const typeOfRequest = input.body.typeOfRequest;
    const amendmentReason = input.body.amendmentReason;

    if (amendmentReason !== 'creditRepayment' && typeOfRequest === 'Cancellation') {
        validationErrors.push({
            errorCode: 'OnReview_to_CancelWithoutPayment_CreditRepaymentOnly'
        });
    }

    checkCancellation(input, validationErrors);

    return validationErrors;

};
