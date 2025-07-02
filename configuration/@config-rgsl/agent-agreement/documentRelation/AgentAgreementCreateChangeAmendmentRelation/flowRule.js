/**
 * @errorCode {errorCode} previousAmendmentInProgress
 */

module.exports = function rule({ body, commonBody }) {

    const sequenceNumber = this.businessContext.sequenceNumber;
    const latestAppliedSequenceNumber = this.businessContext.latestAppliedSequenceNumber;
    const latestNonDiscardedSequenceNumber = this.businessContext.latestNonDiscardedSequenceNumber;

    const isFirstUnappliedAmendment = sequenceNumber === latestAppliedSequenceNumber && sequenceNumber === latestNonDiscardedSequenceNumber;

    if (!isFirstUnappliedAmendment) {

        return {
            errorCode: 'previousAmendmentInProgress'
        };
    }

    return isFirstUnappliedAmendment;
};
