'use strict';

const { createFinChangeAmendmentMapping } = require('@config-rgsl/life-insurance/lib/sinkLifeInsuranceHelper');
const lifeInsuranceConstants = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');

module.exports = function mapping(input, sinkExchange) {
    return createFinChangeAmendmentMapping(input, sinkExchange, lifeInsuranceConstants.productCode.EquityLifeInsurancePolicy);
};
