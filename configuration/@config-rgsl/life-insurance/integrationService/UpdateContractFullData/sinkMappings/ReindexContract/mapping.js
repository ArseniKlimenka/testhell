'use strict';

module.exports = function mapping(sinkInput, sinkExchange) {

    const contractData = sinkExchange.resolveContext('contractData');

    return {
        request: {
            EntityType: 'Contract',
            ConfigurationName: contractData.CodeName,
            EntityId: contractData.ContractId
        }
    };
};
