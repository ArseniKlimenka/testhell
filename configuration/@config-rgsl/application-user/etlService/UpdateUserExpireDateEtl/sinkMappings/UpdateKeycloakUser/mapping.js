"use strict";

module.exports = function mapping(input, sinkExchange) {

    const keycloakUser = sinkExchange.resolveContext('keycloakUser');
    keycloakUser.attributes.ExpireDate = input.aaEndDate;

    const output = {
        urlSegments: {
            userId: input.externalId,
        },
        payload: keycloakUser,
    };

    return output;
};
