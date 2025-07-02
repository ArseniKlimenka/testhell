'use strict';

module.exports = function resultMapping(sinkInput, sinkExchange) {

    const adInsureUser = sinkExchange.resolveContext('adInsureUser');
    const keycloakUser = sinkExchange.resolveContext('keycloakUser');

    return {
        adInsureUser: adInsureUser,
        keycloakUser: keycloakUser,
    };
};
