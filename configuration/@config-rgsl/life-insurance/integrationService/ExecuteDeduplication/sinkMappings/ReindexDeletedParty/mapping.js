'use strict';

module.exports = function mapping(sinkInput, sinkExchange) {
    return {
        request: {
            EntityType: 'Party',
            ConfigurationName: 'NaturalPerson',
            EntityId: sinkInput.duplicatePartyId
        }
    };
};
