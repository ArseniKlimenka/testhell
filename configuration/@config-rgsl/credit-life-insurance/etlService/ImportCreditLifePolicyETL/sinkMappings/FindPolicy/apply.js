const { getValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');

module.exports = function apply(sinkResult, sinkInput, sinkExchange) {

    sinkExchange.createdPolicyBody = getValue(sinkResult, 'data.0.resultData.body');

};
