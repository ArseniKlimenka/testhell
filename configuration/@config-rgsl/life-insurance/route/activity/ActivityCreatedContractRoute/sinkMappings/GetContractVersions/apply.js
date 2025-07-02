'use strict';

module.exports = function apply(sinkResult, sinkInput, sinkExchange) {

    sinkExchange.body = sinkResult.data[0].resultData.body;
    sinkExchange.commonBody = sinkResult.data[0].resultData.commonBody;
    sinkExchange.contractNumber = sinkResult.data[0].resultData.contractNumber;
    sinkExchange.configurationName = sinkResult.data[0].resultData.configurationName;

};
