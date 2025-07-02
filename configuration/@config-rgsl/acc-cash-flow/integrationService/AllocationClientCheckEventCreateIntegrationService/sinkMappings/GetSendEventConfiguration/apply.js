'use strict';

module.exports = function apply(sinkResult, sinkInput, sinkExchange) {

    sinkExchange.configurations = sinkResult.data.map(x => x.resultData);
};
