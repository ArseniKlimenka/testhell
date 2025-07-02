'use strict';

module.exports = function mapping(sinkInput, sinkExchange) {

    const sequenceParameters = [];

    sequenceParameters.push({ sequenceName: 'PAS_IMPL.COM_CALC_EXECUTION_STATUS_EXECUTION_ID', count: 1, startValueOffset: 1 });

    return {
        parameters: {
            sequenceParameters: sequenceParameters
        }
    };
};
