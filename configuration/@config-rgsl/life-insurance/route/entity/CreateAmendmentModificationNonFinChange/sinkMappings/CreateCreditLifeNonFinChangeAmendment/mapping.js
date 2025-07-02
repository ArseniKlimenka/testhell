'use strict';

const { createChangeAmendmentMapping } = require('@config-rgsl/life-insurance/lib/sinkLifeInsuranceHelper');
const lifeInsuranceConstants = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');

module.exports = function mapping(input, sinkExchange, additionalDataSourcesResults) {

    return createChangeAmendmentMapping(input, sinkExchange, additionalDataSourcesResults, lifeInsuranceConstants.productCode.CreditLifeInsurancePolicy);

};
