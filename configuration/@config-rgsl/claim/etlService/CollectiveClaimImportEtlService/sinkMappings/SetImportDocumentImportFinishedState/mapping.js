'use static';

module.exports = function mapping(input, sinkExchange) {

    return {
        businessNumber: sinkExchange.globalContext.importDocumentNumber,
        transition: {
            transitionName: 'FinishImporting',
            configurationName: 'CollectiveClaimImport',
            configurationVersion: '1',
            skipIfNotAvailable: true
        }
    };
};
