'use strict';

module.exports = function apply(sinkResult, sinkInput, sinkExchange) {

    const userData = sinkResult.data[0].resultData;

    sinkExchange.userFullName = userData.partyFullName;
};
