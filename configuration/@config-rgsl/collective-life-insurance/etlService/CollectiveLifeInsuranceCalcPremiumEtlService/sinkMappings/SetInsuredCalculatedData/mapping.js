'use strict';

const { getValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');

module.exports = function mapping(input, sinkExchange, additionalDataSourcesResults) {

    const body = additionalDataSourcesResults.GetContractFullDataDataSource.data[0].resultData.body;

    const withTarification = getValue(body, 'basicConditions.withTarification', false);
    if (!withTarification) {

        return null;
    }

    const output = {
        request: {
            id: input.id,
            premium: sinkExchange.premium,
            amount: sinkExchange.amount
        }
    };

    return output;
};
