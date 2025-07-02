'use strict';

module.exports = function mapping(sinkInput, sinkExchange) {

    const result = sinkExchange.resolveContext('result');

    return {
        'ACC_IMPL.RSD_JOB_PP_DATA': result,
    };
};
