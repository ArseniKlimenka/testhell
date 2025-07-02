'use strict';

module.exports = function apply(sinkResult, sinkInput, sinkExchange, additionalDataSourcesResults) {

    if (!sinkResult?.data?.length || sinkResult.data.length === 0) {

        this.stopExecution();
    }
};
