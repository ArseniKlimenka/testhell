'use strict';

module.exports = function ({input, sinkExchange, additionalDataSources}) {

    const keycloakUser = sinkExchange.resolveContext('keycloakUser');

    const successResponse = {
        code: 'OK',
        message: 'Success',
        externalUserId: keycloakUser.id,
    };

    return successResponse;
};
