function isPolicyNotCancelled ({commonBody}) {
    if (commonBody && commonBody.cancellation && Object.keys(commonBody.cancellation).length !== 0) {
        return false;
    }

    return true;
}

/**
 * Checks if there are non active amendments on a policy and based on that returns if new amendment can be created or not.
 * @param  {int} sequenceNumber is the number of current item
 * @param  {int} latestAppliedSequenceNumber number of last applied item
 * @param  {int} latestNonDiscardedSequenceNumber number of last non discarded item
 * @returns {bool} Returns whether selected version (amendment) can be created.
 */
function canAmendmentBeCreated ({sequenceNumber, latestAppliedSequenceNumber, latestNonDiscardedSequenceNumber}) {
    return sequenceNumber === latestAppliedSequenceNumber
        && sequenceNumber === latestNonDiscardedSequenceNumber;
}

/**
 * Checks if there are non cancelled amendments on a policy and based on that returns if new amendment can be created or not.
 * @param  {int} sequenceNumber is the number of current item
 * @param  {int} latestAppliedSequenceNumber number of last applied item
 * @returns {bool} Returns whether selected version (amendment) has a cancelled amendment.
 */
function documentHasCancelledAmendment ({latestSequenceNumber, latestAppliedSequenceNumber}) {
    return latestSequenceNumber != latestAppliedSequenceNumber;
}

module.exports = {
    isPolicyNotCancelled,
    canAmendmentBeCreated,
    documentHasCancelledAmendment
};
