'use strict';

module.exports = function apply(sinkResult, sinkInput, sinkExchange) {
    const response = sinkResult["#text"];

    sinkExchange.mapContext("response", response);
};
