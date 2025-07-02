const { checkIssuedToAmendmentsCreated } = require('@config-rgsl/life-insurance/lib/lifeInsuranceRequestFlowRulesHelper');

/**
 * @errorCode {errorCode} OnReview_ForCancellationOnly
 */

module.exports = function rule(input) {

    const validationErrors = [];

    checkIssuedToAmendmentsCreated(input, validationErrors);

    return validationErrors;

};
