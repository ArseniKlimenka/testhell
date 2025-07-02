'use strict';

const { setCreatedAmendmentContext } = require('@config-rgsl/life-insurance/lib/sinkLifeInsuranceHelper');

module.exports = function apply(sinkResult, sinkInput, sinkExchange) {

    setCreatedAmendmentContext(sinkExchange, sinkResult);
};
