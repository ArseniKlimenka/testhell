'use strict';

module.exports = function mapping(sinkInput, sinkExchange) {
    if (!sinkExchange.resolveContext('ok')) {
        return;
    }

    const dateNow = sinkExchange.resolveContext('dateNow');

    const sat = {
        ETL_EXECUTION_STATUS_ID: '00000000-0000-0000-0000-000000000000',
        EXECUTION_DATE: dateNow,
    };

    return {
        'ACC_IMPL.RSD_JOB_LOG': [sat],
    };
};
