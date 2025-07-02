"use strict";

module.exports = function apply(sinkResult, sinkInput, sinkExchange) {

    sinkExchange.createdDocument = {};
    sinkExchange.createdDocument.Body = sinkResult.body;
    sinkExchange.createdDocument.Id = sinkResult.id;
    sinkExchange.createdDocument.Number = sinkResult.number;

    sinkExchange.logMessages.push({
        message: `Создана корректировка ${sinkResult.number}`,
        logLevel: 'debug'
    });
};
