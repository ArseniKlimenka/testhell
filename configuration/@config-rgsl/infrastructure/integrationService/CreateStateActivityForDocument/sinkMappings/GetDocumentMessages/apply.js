'use strict';

module.exports = function apply(sinkResult, sinkInput, sinkExchange) {

    const messageRequests = (sinkResult?.data ?? []).map(_ => JSON.parse(_.resultData.message));
    const latestRequest = messageRequests.sort(function (a, b) { return new Date(a.TimestampUtc).getTime() > new Date(b.TimestampUtc).getTime() ? -1 : 1; })[0];

    sinkExchange.statusMessage = JSON.parse(latestRequest.Message);
    sinkExchange.timeStamp = new Date(latestRequest.TimestampUtc);
    sinkExchange.correlationId = latestRequest.CorrelationId;
};
