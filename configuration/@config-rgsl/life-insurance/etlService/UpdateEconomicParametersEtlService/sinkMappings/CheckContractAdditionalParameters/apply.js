'use strict';

module.exports = function apply(sinkResult, sinkInput, sinkExchange, additionalDataSourcesResults) {

    if (sinkResult.data.length > 1) {

        const contractEntityDocumentNumbers = sinkResult.data.map(i => i.resultData.contractEntityDocumentNumber).join("; ");
        throw new Error(`E: Найдено несколько документов типа дополнительные параметры договора: ${contractEntityDocumentNumbers}.`);
    }
};
