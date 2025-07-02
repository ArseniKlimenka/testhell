'use strict';

module.exports = function mapping(input) {

    return {
        request: {
            EntityType: input.EntityType,
            ConfigurationName: input.ConfigurationName,
            EntityId: input.EntityId
        }
    };

};
