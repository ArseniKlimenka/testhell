'use strict';

module.exports = function apply(sinkResult, sinkInput, sinkExchange, additionalDataSourcesResults) {

    if (sinkResult?.data?.length > 0) {

        sinkExchange.allocations = sinkResult.data.map(d => d.resultData);
    }
};
