"use strict";

module.exports = function mapping(input, sinkExchange) {

    const keycloakUser = sinkExchange.resolveContext('keycloakUser');
    keycloakUser.enabled = false;

    const output = {
        urlSegments: {
            userId: input.externalId,
        },
        payload: keycloakUser,
    };

    return output;
};
