'use strict';

module.exports = function apply(sinkResult, sinkInput, sinkExchange) {

    sinkExchange.mapContext('state', sinkResult.VerificationState);
};
