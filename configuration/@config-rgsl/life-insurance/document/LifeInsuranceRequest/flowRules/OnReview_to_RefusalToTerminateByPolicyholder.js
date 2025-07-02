'use strict';

const { checkCancellation } = require('@config-rgsl/life-insurance/lib/lifeInsuranceRequestFlowRulesHelper');

/**
 * @errorCode {errorCode} OnReview_ForCancellationOnly
 */

module.exports = function rule(input) {

    const validationErrors = [];

    checkCancellation(input, validationErrors);

    return validationErrors;

};
