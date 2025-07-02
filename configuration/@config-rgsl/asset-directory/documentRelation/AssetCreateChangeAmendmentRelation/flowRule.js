'use strict';

/**
 * @errorCode {errorCode} assetTransitionPreviousCorrectionInProgress
 */

const amendmentUtils = require('@config-rgsl/life-insurance/lib/amendmentUtils');

module.exports = function rule(input) {

    const isFirstUnappliedAmendment = amendmentUtils.isFirstUnappliedAmendment(this.businessContext.sequenceNumber, this.businessContext.latestAppliedSequenceNumber, this.businessContext.latestNonDiscardedSequenceNumber);

    if (!isFirstUnappliedAmendment) {
        return {
            errorCode: 'assetTransitionPreviousCorrectionInProgress'
        };
    }

    return isFirstUnappliedAmendment;
};
