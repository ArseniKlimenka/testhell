"use strict";

const { createLifeAmendmentCancellationMapping } = require('@config-rgsl/life-insurance/lib/sinkLifeInsuranceHelper');
const lifeInsuranceConstants = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');

module.exports = function mapping(input, sinkExchange, additionalDataSourcesResults) {

    return createLifeAmendmentCancellationMapping(input, sinkExchange, additionalDataSourcesResults, lifeInsuranceConstants.productCode.AccumulatedLifeInsurancePolicy);
};
