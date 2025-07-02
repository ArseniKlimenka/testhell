'use strict';

const { setContractApply } = require('@config-rgsl/life-insurance/lib/sinkLifeInsuranceHelper');

module.exports = function apply(sinkResult, sinkInput, sinkExchange) {

    return setContractApply(sinkExchange, sinkResult);
};
