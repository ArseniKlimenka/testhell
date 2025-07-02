module.exports = function apply(sinkResult, sinkInput, sinkExchange) {

    sinkExchange.mapContext('keycloakUser', sinkResult.keycloakUser);
};
