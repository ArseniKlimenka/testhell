module.exports = function apply(sinkResult, sinkInput, sinkExchange) {
    const results = sinkResult.content;

    if (results?.length !== 1) {
        throw 'Keycloak user was not created. Result count is ' + results?.length;
    }

    const result = results[0];
    sinkExchange.mapContext('keycloakUser', result);
};
