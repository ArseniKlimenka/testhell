'use strict';

const { setAmendmentApply } = require('@config-rgsl/life-insurance/lib/sinkLifeInsuranceHelper');

module.exports = function apply(sinkResult, sinkInput, sinkExchange) {

    return setAmendmentApply(sinkExchange, sinkResult);

};
