'use strict';

module.exports = function apply(sinkResult, sinkInput, sinkExchange, additionalDataSourcesResults) {

    if (sinkResult.data.length == 0) {

        throw "Документ не найден!";
    }

    const contractEntityData = sinkResult.data.map(i => i.resultData);
    sinkExchange.contractEntityData = contractEntityData[0];
};
