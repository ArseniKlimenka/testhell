'use strict';

const { rateOfReturnSetOptionsFilter } = require('@config-rgsl/life-insurance/lib/productConfigurationUtils');

module.exports = function mapping(input, dataSourceResponse) {

    const body = input.context?.Body || this.businessContext?.rootData;

    const responseData = dataSourceResponse?.data ?? [];
    const ratesOfReturn = responseData.map(i => i.resultData);

    rateOfReturnSetOptionsFilter(body, ratesOfReturn);
};
