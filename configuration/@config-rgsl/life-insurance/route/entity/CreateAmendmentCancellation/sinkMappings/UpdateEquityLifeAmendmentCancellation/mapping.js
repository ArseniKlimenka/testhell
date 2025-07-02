"use strict";

const { updateLifeAmendmentCancellationMapping } = require('@config-rgsl/life-insurance/lib/sinkLifeInsuranceHelper');
const lifeInsuranceConstants = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');

module.exports = function mapping(input, sinkExchange, additionalDataSourcesResults) {

    return updateLifeAmendmentCancellationMapping(input, sinkExchange, additionalDataSourcesResults, lifeInsuranceConstants.productCode.EquityLifeInsurancePolicy);

};
