'use strict';

module.exports = function apply(sinkResult, sinkInput, sinkExchange) {

    const sequences = sinkResult.find(r => r.sequenceName === 'PAS_IMPL.COM_CALC_EXECUTION_STATUS_EXECUTION_ID');
    sinkExchange.executionId = sequences.ids[0];
};
