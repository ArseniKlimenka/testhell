'use strict';

module.exports = function apply(sinkResult, sinkInput, sinkExchange) {

    const result = sinkExchange.resolveContext('result');
    const ids = sinkResult.find(_ => _.sequenceName === 'ACC_IMPL.RSD_JOB_PP_DATA').ids;
    if (result.length !== ids.length) {
        throw new Error('Wrong sequnece result length');
    }

    for (let i = 0; i < result.length; ++i) {
        result[i].RSD_JOB_PP_DATA_ID = ids[i];
    }
};
