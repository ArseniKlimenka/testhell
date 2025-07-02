'use static';

module.exports = function mapping(input, sinkExchange) {

    return {
        businessNumber: sinkExchange.globalContext.claimNumber,
        transition: {
            transitionName: 'FinishImport',
            configurationName: 'CollectiveClaim',
            configurationVersion: '1',
            skipIfNotAvailable: true
        }
    };
};
