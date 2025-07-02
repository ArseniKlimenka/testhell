'use strict';

module.exports = function (sinkResult, sinkInput, sinkExchange) {
    const bsiIds = sinkResult.data.map(_ => _.resultData.bankStatementItemId);
    sinkExchange.mapContext("bankStatementItemIds", bsiIds);
};
