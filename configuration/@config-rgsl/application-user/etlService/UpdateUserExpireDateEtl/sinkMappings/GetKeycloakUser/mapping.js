"use strict";

module.exports = function mapping(input) {

    const output = {
        urlSegments: {
            userId: input.externalId,
        },
    };

    return output;
};
