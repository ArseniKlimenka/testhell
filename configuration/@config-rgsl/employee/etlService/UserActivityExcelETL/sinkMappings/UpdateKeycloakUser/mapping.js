"use strict";

module.exports = function mapping(input, sinkExchange) {

    const user = sinkExchange.user;
    const keycloakUser = sinkExchange.resolveContext('keycloakUser');

    // Error must be in Russian. RGSL requirement
    if (keycloakUser.enabled == false) { throw 'Заблокирован ранее'; }
    keycloakUser.enabled = false;

    const output = {
        urlSegments: {
            userId: user.ExternalId,
        },
        payload: keycloakUser,
    };

    return output;
};
