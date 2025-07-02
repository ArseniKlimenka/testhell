'use strict';

const { getAmendmentMapping } = require('@config-rgsl/life-insurance/lib/sinkLifeInsuranceHelper');

module.exports = function mapping(input, sinkExchange) {

    return getAmendmentMapping(sinkExchange);

};
