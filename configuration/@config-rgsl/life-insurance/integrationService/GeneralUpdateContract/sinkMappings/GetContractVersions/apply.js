'use strict';

module.exports = function apply(sinkResult, sinkInput, sinkExchange) {

    if (sinkResult.data.length < 1) {

        throw "Документ не найден!";
    }

    const mappedVersions = sinkResult.data.map(v => {

        return {
            number: v.resultData.contractNumber,
            seq: v.resultData.seqNumber,
            body: v.resultData.body,
            conf: v.resultData.configurationName,
            versionState: v.resultData.versionState,
            documentState: v.resultData.documentStateCode,
        };
    });

    let docsToUpdate = mappedVersions.filter(v => v.versionState !== 'Discarded');
    docsToUpdate = docsToUpdate.sort((a, b) => b.seq - a.seq).reverse();

    sinkExchange.mapContext('docsToUpdate', docsToUpdate);
};
