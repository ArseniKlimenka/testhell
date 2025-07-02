"use strict";

module.exports = function mapping(input, sinkExchange) {

    const user = sinkExchange.user;

    const output = {
        urlSegments: {
            userId: user.ExternalId,
        },
    };

    return output;
};
