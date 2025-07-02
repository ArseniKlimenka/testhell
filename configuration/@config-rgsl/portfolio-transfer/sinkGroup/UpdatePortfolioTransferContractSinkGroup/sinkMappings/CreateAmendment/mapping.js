'use strict';

module.exports = function mapping(input, sinkExchange, additionalDataSourcesResults) {
    const relationInfo = sinkExchange.resolveContext('relationInfo');
    if (relationInfo.mainStateCode !== 'Activated') {
        return;
    }

    return {
        businessNumber: input.contractNumber,
        relation: {
            configurationName: relationInfo.mainConfigurationName,
            configurationVersion: '1',
            relationName: relationInfo.relationName,
        },
    };
};
