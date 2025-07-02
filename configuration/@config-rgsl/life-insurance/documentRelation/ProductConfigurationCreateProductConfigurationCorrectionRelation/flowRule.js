'use strict';

/**
 * @errorCode {errorCode} productConfigurationTransitionPreviousCorrectionInProgress
 */

const amendmentUtils = require('@config-rgsl/life-insurance/lib/amendmentUtils');

module.exports = function rule({ body, commonBody }) {

    const isFirstUnappliedAmendment = amendmentUtils.isFirstUnappliedAmendment(this.businessContext.sequenceNumber, this.businessContext.latestAppliedSequenceNumber, this.businessContext.latestNonDiscardedSequenceNumber);

    if (!isFirstUnappliedAmendment) {
        return {
            errorCode: 'productConfigurationTransitionPreviousCorrectionInProgress'
        };
    }

    return isFirstUnappliedAmendment;

};
