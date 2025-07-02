'use strict';

module.exports = function apply(sinkResult, sinkInput, sinkExchange) {

    let sequenceNumber = sinkResult.toString();
    const zeroCount = 5 - sequenceNumber.length;
    sequenceNumber = sequenceNumber.padStart(zeroCount, '0');

    sinkExchange.changeMailSequence = sequenceNumber;
};
