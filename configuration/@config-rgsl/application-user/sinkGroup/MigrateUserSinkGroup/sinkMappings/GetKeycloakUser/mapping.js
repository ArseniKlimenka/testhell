"use strict";

module.exports = function mapping(input, sinkExchange) {

    const adInsureUser = sinkExchange.resolveContext('adInsureUser');
    if (adInsureUser.ExternalId) {
        return;
    }

    const output = {
        queryStrings: {
            username: input.username,
            exact: true,
        },
    };

    return output;
};
