"use strict";

module.exports = function mapping(input, sinkExchange) {

    const output = {
        queryStrings: {
            username: input.data.userName,
            exact: true,
        },
    };

    return output;
};
