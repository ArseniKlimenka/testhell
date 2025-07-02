'use strict';

module.exports = function ({input, sinkExchange, additionalDataSources}) {
    const lastExecutionDate = sinkExchange.resolveContext('lastExecutionDate');
    const dateNow = sinkExchange.resolveContext('dateNow');
    const success = sinkExchange.resolveContext('ok') ?? false;

    const successResponse = {
        code: 'OK',
        message: success ? 'ETL successfully started!' : 'ETL was not started!',
        dateFrom: lastExecutionDate,
        dateTo: dateNow,
    };

    return successResponse;
};
