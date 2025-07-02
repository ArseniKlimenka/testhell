'use strict';

const { checkPolicyAmendmentsStatus, checkFinAmendmentStatus } = require('@config-rgsl/life-insurance/lib/lifeInsuranceRequestFlowRulesHelper');

/**
 * @errorCode {errorCode} FinAmendmentDoesNotFitTheCondition
 * @errorCode {errorCode} FinAmendmentWasCreated
 * @errorCode {errorCode} PolicyAmendmentsNotInCompletedStatus
 */

module.exports = function rule(input) {

    const validationErrors = [];

    checkFinAmendmentStatus(input, validationErrors);

    return validationErrors;

};
