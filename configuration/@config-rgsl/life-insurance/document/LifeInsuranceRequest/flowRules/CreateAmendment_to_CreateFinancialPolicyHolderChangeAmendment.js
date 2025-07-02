'use strict';

const { checkPolicyAmendmentsStatus, checkFinPolicyHolderAmendmentStatus } = require('@config-rgsl/life-insurance/lib/lifeInsuranceRequestFlowRulesHelper');

/**
 * @errorCode {errorCode} FinPolicyHolderAmendmentDoesNotFitTheCondition
 * @errorCode {errorCode} FinPolicyHolderAmendmentWasCreated
 * @errorCode {errorCode} PolicyAmendmentsNotInCompletedStatus
 */

module.exports = function rule(input) {

    const validationErrors = [];

    checkFinPolicyHolderAmendmentStatus(input, validationErrors);

    return validationErrors;

};
