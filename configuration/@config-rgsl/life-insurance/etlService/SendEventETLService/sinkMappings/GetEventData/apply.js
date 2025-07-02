'use strict';

module.exports = function apply(sinkResult, sinkInput, sinkExchange) {

    if (sinkResult?.data?.length > 0) {

        const latestResult = sinkResult.data.sort(function (a, b) { return new Date(b.createdDate).getTime() < new Date(a.createdDate).getTime() ? -1 : 1; })[0]?.resultData ?? {};

        const request = latestResult.request ?? {};
        const response = latestResult.response ?? {};

        sinkExchange.bookNumber = response?.bookNumber;
        sinkExchange.insuranceId = response?.id;
    }

};
