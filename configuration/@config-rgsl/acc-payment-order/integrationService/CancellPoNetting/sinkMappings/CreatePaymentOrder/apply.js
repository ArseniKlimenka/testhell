'use strict';

module.exports = function apply(sinkResult, sinkInput, sinkExchange) {

    sinkExchange.createdPoNumber = sinkResult.documentNumber;
};
