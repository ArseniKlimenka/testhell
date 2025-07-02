'use strict';

module.exports = function apply(sinkResult, sinkRequest, sinkExchange) {

    if (sinkExchange.paymentData && sinkResult.data && sinkResult.data.length > 0) {

        const partyName = sinkExchange.paymentData.debtorName;
        const filteredByName = sinkResult.data.filter(item => item.resultData.fullName === partyName);

        if (filteredByName.length > 0) {

            sinkExchange.partyData = filteredByName[0].resultData;
        }
        else {

            sinkExchange.partyData = sinkResult.data[0].resultData;
        }
    }
};
