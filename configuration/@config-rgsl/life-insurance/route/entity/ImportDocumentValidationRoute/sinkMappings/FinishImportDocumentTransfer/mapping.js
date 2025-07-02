'use strict';

module.exports = function mapping(input, sinkExchange) {

    const failedCount = sinkExchange.resolveContext('failedCount');
    const number = input.number;

    const result = {
        businessNumber: number,
        transition: {
            transitionName: failedCount === 0 ? 'StartImporting' : 'FinishValidatingWithError',
            configurationName: input.configurationCodeName,
            configurationVersion: input.configurationVersion
        }
    };

    return result;
};
