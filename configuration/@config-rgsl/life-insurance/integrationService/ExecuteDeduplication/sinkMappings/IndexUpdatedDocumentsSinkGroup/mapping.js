'use strict';

module.exports = function mapping(sinkResult, sinkExchange) {

    const requests = sinkExchange.updatedDocuments.map(element => {
        return {
            EntityType: element.ENTITY,
            ConfigurationName: element.CODE_NAME,
            EntityId: element.ID
        };
    });

    return requests;

};
