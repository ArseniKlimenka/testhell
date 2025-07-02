'use strict';

/**
 * @errorCode {errorCode} policyTransitionPreviousAmendmentInProgress
 */

const amendmentUtils = require('@config-rgsl/life-insurance/lib/amendmentUtils');

module.exports = function rule({ body, commonBody }) {

    return amendmentUtils.getChangeAmendmentFlowRule(this);

};
