"use strict";

module.exports = function resultMapping(input, sinkExchange) {

    return {
        enrichedBody: sinkExchange.body
    };
};
