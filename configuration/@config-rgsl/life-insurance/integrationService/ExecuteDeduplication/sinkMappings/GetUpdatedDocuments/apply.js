'use strict';

module.exports = function apply(sinkResult, sinkInput, sinkExchange) {

    const resultData = sinkResult.data.map(i => i.resultData);
    const resultDataByMaxId = resultData.reduce(function(prev, current) {
        return (prev.id > current.id) ? prev : current;
    });
    const updatedDocuments = resultDataByMaxId.updatedDocuments;

    sinkExchange.updatedDocuments = updatedDocuments;

};
