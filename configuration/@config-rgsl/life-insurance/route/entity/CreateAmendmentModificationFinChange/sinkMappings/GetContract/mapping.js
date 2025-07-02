'use strict';

const { getContractMapping } = require('@config-rgsl/life-insurance/lib/sinkLifeInsuranceHelper');

module.exports = function mapping(input, sinkExchange) {

    return getContractMapping(sinkExchange);

};
