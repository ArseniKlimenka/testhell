"use strict";

module.exports = function mapping(input, sinkExchange) {

    const output = {
        urlSegments: {
            userId: input.externalId,
        },
    };

    return output;
};
