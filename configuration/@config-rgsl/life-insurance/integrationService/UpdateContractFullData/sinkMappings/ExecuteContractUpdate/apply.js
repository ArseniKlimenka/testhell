'use strict';

module.exports = function apply(sinkResult, sinkInput, sinkExchange) {

    sinkExchange.mapContext('initialData', sinkResult.InitialData);
    sinkExchange.mapContext('updatedData', sinkResult.UpdatedData);
};
