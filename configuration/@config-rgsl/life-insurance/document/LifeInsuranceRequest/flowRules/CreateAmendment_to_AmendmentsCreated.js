'use strict';

const { checkCompleteAmendments } = require('@config-rgsl/life-insurance/lib/lifeInsuranceRequestFlowRulesHelper');

/**
 * @errorCode {errorCode} AllAmendmentsShouldBeActivated
 */

module.exports = function rule(input) {

    const validationErrors = [];

    checkCompleteAmendments(input, validationErrors);

    return validationErrors;

};
