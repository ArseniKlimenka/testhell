'use strict';

module.exports = function apply(sinkResult, sinkInput, sinkExchange) {

    const ppData = sinkResult.data.map(_ => _.resultData);

    if (!ppData || !sinkResult.data || sinkResult.data.length === 0) {
        sinkExchange.logMessages.push({
            message: 'NonResidentNotificationDataDataSource returned no data',
            logLevel: 'debug'
        });
    }

    sinkExchange.ppData = ppData;
};
