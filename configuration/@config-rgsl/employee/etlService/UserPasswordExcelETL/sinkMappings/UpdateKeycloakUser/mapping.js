"use strict";

const { getPassword } = require('@config-rgsl/employee/lib/exportUserHelper');

module.exports = function mapping(input, sinkExchange) {

    const keycloakUser = sinkExchange.resolveContext('keycloakUser');

    if (keycloakUser.enabled == false) { throw 'Пользователь неактивен'; }

    const password = getPassword();
    sinkExchange.password = password;
    keycloakUser.credentials = [{
        type: 'password',
        value: password,
    }];

    const output = {
        urlSegments: {
            userId: keycloakUser.id,
        },
        payload: keycloakUser,
    };

    return output;
};
