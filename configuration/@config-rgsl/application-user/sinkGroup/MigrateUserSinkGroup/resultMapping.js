'use strict';

module.exports = function resultMapping(sinkInput, sinkExchange) {

    const user = sinkExchange.resolveContext('keycloakUser');

    return {
        keycloakUser: user,
    };
};
