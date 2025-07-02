'use strict';

module.exports = function apply(sinkResult, sinkInput, sinkExchange) {

    sinkExchange.globalContext.amendmentConfName = sinkResult.amendmentConfName;
};
