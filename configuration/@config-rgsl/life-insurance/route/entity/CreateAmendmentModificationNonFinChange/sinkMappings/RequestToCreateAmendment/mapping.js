'use strict';

const { requestToCreateAmendmentMapping } = require('@config-rgsl/life-insurance/lib/sinkLifeInsuranceHelper');

module.exports = function mapping(input, sinkExchange) {

    return requestToCreateAmendmentMapping(input, sinkExchange);

};
