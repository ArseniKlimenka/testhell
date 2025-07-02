'use strict';

module.exports = function apply(sinkResult, sinkInput, sinkExchange) {


    const createdQuote = {
        id: sinkResult.id,
        documentNumber: sinkResult.documentNumber
    };

    sinkExchange.createdQuote = createdQuote;

};
