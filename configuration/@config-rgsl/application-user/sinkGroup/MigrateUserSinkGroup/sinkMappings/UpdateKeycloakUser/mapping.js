"use strict";

module.exports = function mapping(input, sinkExchange) {

    const adInsureUser = sinkExchange.resolveContext('adInsureUser');
    if (!adInsureUser.ExternalId) {
        return;
    }

    const keycloakUser = sinkExchange.resolveContext('keycloakUser');

    const output = {
        urlSegments: {
            userId: adInsureUser.ExternalId,
        },
        payload: keycloakUser,
    };

    return output;
};
