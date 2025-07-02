'use strict';

module.exports = function apply(sinkResult, sinkInput, sinkExchange) {

    const bsiData = sinkResult.data.map(_ => _.resultData)[0];

    if (!bsiData || !sinkResult.data || sinkResult.data.length === 0) {

        sinkExchange.logMessages.push({
            message: 'BankStatementItemDatabaseDataSource returned no data',
            logLevel: 'debug'
        });
    }

    sinkExchange.incomeSourceName = bsiData.incomeSourceName;
    sinkExchange.incomeCurrencyCode = bsiData.currencyCode;
};
