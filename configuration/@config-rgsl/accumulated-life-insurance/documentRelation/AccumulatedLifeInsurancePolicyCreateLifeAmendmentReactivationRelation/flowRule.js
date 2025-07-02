/**
 * @errorCode {errorCode} policyTransitionPreviousAmendmentInProgress
 */

const amendmentUtils = require('@config-rgsl/life-insurance/lib/amendmentUtils');

module.exports = function rule({ body, commonBody }) {

    const isFirstUnappliedAmendment = amendmentUtils.isFirstUnappliedAmendment(this.businessContext.sequenceNumber, this.businessContext.latestAppliedSequenceNumber, this.businessContext.latestNonDiscardedSequenceNumber);

    if (!isFirstUnappliedAmendment) {
        return {
            errorCode: 'policyTransitionPreviousAmendmentInProgress'
        };
    }

    return isFirstUnappliedAmendment;

};
