'use strict';

module.exports = function apply(sinkResult, sinkInput, sinkExchange) {

    const length = sinkResult.data?.length ?? 0;
    if (length !== 1) {
        throw 'Act not found: ' + length;
    }
    sinkExchange.mapContext('act', sinkResult.data[0].resultData);
};
