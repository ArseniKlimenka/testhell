'use strict';

module.exports = function apply(sinkResult, sinkInput, sinkExchange) {
    const importedItems = sinkResult.data.map(i => (i.resultData));
    sinkExchange.mapContext("importedItems", importedItems);
};
