"use strict";

module.exports = function mapping(input, sinkExchange) {

    const user = sinkExchange.mapContext('user');

    const output = {
        urlSegments: {
            userId: user.ExternalId,
        },
    };

    return output;
};
