'use strict';

const { getValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');

module.exports = function mapping(input, sinkExchange, additionalDataSourcesResults) {

    const body = additionalDataSourcesResults.GetContractFullDataDataSource.data[0].resultData.body;

    const withTarification = getValue(body, 'basicConditions.withTarification', false);
    if (!withTarification) {

        return null;
    }

    const output = {};
    output.contractNumber = this.businessContext.etlServiceInput.contractNumber;

    return { request: output };
};
