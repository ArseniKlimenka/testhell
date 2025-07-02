'use strict';

module.exports = function apply(sinkResult, sinkInput, sinkExchange) {

    const result = sinkExchange.resolveContext('result');
    const ids = sinkResult.find(_ => _.sequenceName === 'ACC_IMPL.REVALUATION_DATA_ID').ids;
    if (result.length !== ids.length) {
        throw new Error('Wrong sequnece result length');
    }

    for (let i = 0; i < result.length; ++i) {
        result[i].id = ids[i];
    }
};
