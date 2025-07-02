"use strict";

module.exports = function apply(sinkResult, sinkInput, sinkExchange) {

    sinkExchange.body = sinkResult.body;
};
