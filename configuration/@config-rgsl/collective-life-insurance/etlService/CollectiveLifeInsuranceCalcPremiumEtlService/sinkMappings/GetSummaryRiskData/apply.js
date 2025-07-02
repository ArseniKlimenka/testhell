'use strict';

module.exports = function apply(sinkResult, sinkInput, sinkExchange, additionalDataSourcesResults) {

    const risks = sinkResult.data.map(x => x.resultData);
    sinkExchange.risks = risks;
};
