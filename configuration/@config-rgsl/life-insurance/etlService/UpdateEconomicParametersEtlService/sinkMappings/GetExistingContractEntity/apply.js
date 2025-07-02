'use strict';

module.exports = function apply(sinkResult, sinkInput, sinkExchange, additionalDataSourcesResults) {

    if (sinkResult.data?.length > 0) {

        const contractEntityData = sinkResult.data.map(i => i.resultData);
        sinkExchange.contractEntityData = contractEntityData[0];
    }
};
