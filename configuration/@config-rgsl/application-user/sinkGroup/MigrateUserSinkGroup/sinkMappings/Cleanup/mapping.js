module.exports = function mapping(input, sinkExchange) {

    const adInsureUser = sinkExchange.resolveContext('adInsureUser');
    if (adInsureUser.ExternalId) {
        return;
    }

    const keycloakUser = sinkExchange.resolveContext('keycloakUser');

    return {
        request: {
            username: input.username,
            externalId: keycloakUser.id,
        },
    };
};
