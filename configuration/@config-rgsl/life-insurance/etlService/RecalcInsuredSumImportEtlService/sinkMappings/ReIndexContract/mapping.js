module.exports = function mapping(input, sinkExchange) {

    return {
        request: {
            EntityType: 'Contract',
            ConfigurationName: sinkExchange.confName,
            EntityId: sinkExchange.id
        }
    };

};
