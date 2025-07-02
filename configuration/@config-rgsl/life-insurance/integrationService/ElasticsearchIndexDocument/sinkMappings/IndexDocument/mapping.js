'use strict';

module.exports = function mapping(sinkInput, sinkExchange) {

    return {
        request: {
            EntityType: sinkInput.entityType,
            ConfigurationName: sinkInput.configurationName,
            EntityId: sinkInput.entityId
        }
    };

};
