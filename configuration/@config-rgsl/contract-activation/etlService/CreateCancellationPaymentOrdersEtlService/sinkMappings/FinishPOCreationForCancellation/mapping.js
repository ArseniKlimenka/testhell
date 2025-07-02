"use strict";

module.exports = function mapping(input, sinkExchange) {

    return {
        businessNumber: input.amendmentNumber,
        transition: {
            transitionName: 'FinishPOCreation',
            configurationName: sinkExchange.globalContext.amendmentConfName,
            configurationVersion: '1'
        }
    };
};
