'use strict';

module.exports = function apply(sinkResult, sinkInput, sinkExchange) {

    let sequenceNumber = sinkResult.sequenceNumber.toString();
    const zeroCount = 5 - sequenceNumber.length;
    sequenceNumber = sequenceNumber.padStart(zeroCount, '0');

    sinkExchange.claimMailSequence = sequenceNumber;
};
