'use strict';

const { checkPolicyAmendmentsStatus, checkNonFinAmendmentStatus } = require('@config-rgsl/life-insurance/lib/lifeInsuranceRequestFlowRulesHelper');

/**
 * @errorCode {errorCode} NonFinAmendmentDoesNotFitTheCondition
 * @errorCode {errorCode} NonFinAmendmentWasCreated
 * @errorCode {errorCode} PolicyAmendmentsNotInCompletedStatus
 */

module.exports = function rule(input) {

    const validationErrors = [];

    checkNonFinAmendmentStatus(input, validationErrors);

    return validationErrors;

};
