"use strict";

module.exports = function mapping(input, sinkExchange) {

    return {
        businessNumber: input.endowmentNumber
    };
};
