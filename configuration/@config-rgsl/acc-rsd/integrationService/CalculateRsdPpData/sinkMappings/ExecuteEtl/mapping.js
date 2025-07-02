'use strict';


module.exports = function mapping(sinkInput, sinkExchange) {
    if (!sinkExchange.resolveContext('ok')) {
        return;
    }

    const lastExecutionDate = sinkExchange.resolveContext('lastExecutionDate');
    const dateNow = sinkExchange.resolveContext('dateNow');

    return {
        from: lastExecutionDate,
        executionDate: dateNow,
    };
};
