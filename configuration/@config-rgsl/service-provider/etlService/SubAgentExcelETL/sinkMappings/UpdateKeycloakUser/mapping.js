"use strict";

module.exports = function mapping(input, sinkExchange) {

    const user = sinkExchange.user;
    const keycloakUser = sinkExchange.resolveContext('keycloakUser');
    keycloakUser.firstName = input.data.physicalPersonFullName;

    const output = {
        urlSegments: {
            userId: user.ExternalId,
        },
        payload: keycloakUser,
    };

    return output;
};
