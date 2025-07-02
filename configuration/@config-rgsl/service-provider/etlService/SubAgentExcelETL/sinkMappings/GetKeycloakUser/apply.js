module.exports = function apply(sinkResult, sinkInput, sinkExchange) {
    const result = sinkResult.content;

    if (!result.id) {
        throw 'Keycloak user was not found. ' + JSON.stringify(result);
    }

    sinkExchange.mapContext('keycloakUser', result);
};
