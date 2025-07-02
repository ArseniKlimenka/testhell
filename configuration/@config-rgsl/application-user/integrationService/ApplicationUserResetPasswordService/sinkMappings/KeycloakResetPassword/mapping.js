"use strict";

module.exports = function mapping(input, sinkExchange) {

    const output = {
        urlSegments: {
            userId: input.externalId,
        },
        payload: {
            type: 'password',
            value: input.password,
        },
    };

    return output;
};
