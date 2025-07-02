'use strict';

module.exports = function apply(sinkResult, sinkInput, sinkExchange) {

    sinkExchange.body = sinkResult.data[0]?.resultData.body;
    sinkExchange.commonBody = sinkResult.data[0]?.resultData.commonBody;
    sinkExchange.id = sinkResult.data[0]?.resultData.id;
    sinkExchange.confName = sinkResult.data[0]?.resultData.confName;
};
