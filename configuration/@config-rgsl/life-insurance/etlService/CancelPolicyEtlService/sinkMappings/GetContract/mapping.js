'use strict';

const { getContractMapping } = require('@config-rgsl/life-insurance/lib/sinkLifeInsuranceHelper');

module.exports = function mapping(input, sinkExchange) {

    if (!sinkExchange.canCreateCancellation) {

        return null;
    }

    return getContractMapping(input);
};
