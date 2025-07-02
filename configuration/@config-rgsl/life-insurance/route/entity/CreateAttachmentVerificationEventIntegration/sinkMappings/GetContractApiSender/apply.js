'use strict';

module.exports = function apply(sinkResult, sinkInput, sinkExchange) {

    sinkExchange.apiSender = sinkResult.data[0].resultData.apiSender;
    sinkExchange.creatorUsername = sinkResult.data[0].resultData.creatorUsername;
};
