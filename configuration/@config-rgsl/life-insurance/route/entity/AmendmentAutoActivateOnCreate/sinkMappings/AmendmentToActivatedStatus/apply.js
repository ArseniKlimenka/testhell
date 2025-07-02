"use strict";

module.exports = function apply(sinkResult, sinkInput, sinkExchange) {

    sinkExchange.newState = sinkResult.newState;
};
