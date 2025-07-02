module.exports = function resultMapping(input) {

    const output = {};

    output.latestSequenceNumber = input.LATEST_SEQ_NUMBER;
    output.latestAppliedSequenceNumber = input.LATEST_APPLIED_SEQ_NUMBER;
    output.latestNonDiscardedSequenceNumber = input.LATEST_NON_DISCARDED_SEQ_NUMBER;

    return output;
};
