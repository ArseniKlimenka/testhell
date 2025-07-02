'use strict';

module.exports = function apply(sinkResult, sinkInput, sinkExchange) {

    if (sinkResult.data.length !== 1) {
        throw 'policyParties was not found! (' + sinkResult.data.length + ')';
    }

    sinkExchange.policyParties = sinkResult.data[0].resultData.parties;
};

