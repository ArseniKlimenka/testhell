'use strict';

module.exports = function apply(sinkResult, sinkInput, sinkExchange, additionalDataSourcesResults) {

    if (sinkResult.data.length < 1) {

        throw "Договор страхования не найден!";
    }

    const mappedVersions = sinkResult.data.map(v => {

        return {
            id: v.resultData.contractId,
            number: v.resultData.contractNumber,
            seq: v.resultData.seqNumber,
            body: v.resultData.body,
            conf: v.resultData.configurationName,
            versionState: v.resultData.versionState,
            documentState: v.resultData.documentStateCode,
        };
    });

    const docsToUpdate = mappedVersions.filter(v => v.versionState === 'Applied' || v.seq === 0);

    sinkExchange.mapContext('docsToUpdate', docsToUpdate);
};
