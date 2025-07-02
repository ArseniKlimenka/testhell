'use strict';

module.exports = function apply(sinkResult, sinkInput, sinkExchange) {

    let sequenceNumber = sinkResult.sequenceNumber.toString();
    const zeroCount = 7 - sequenceNumber.length;
    sequenceNumber = sequenceNumber.padStart(zeroCount, '0');

    sinkExchange.informationLetterNumber = `99-08-421-04/${sequenceNumber}`;

};
