'use strict';

const { requestOnReviewToCreateAmendmentMapping } = require('@config-rgsl/life-insurance/lib/sinkLifeInsuranceHelper');

module.exports = function mapping(input, sinkExchange) {

    return requestOnReviewToCreateAmendmentMapping(input, sinkExchange);

};
