'use strict';

module.exports = function apply(sinkResult, sinkInput, sinkExchange) {

    if (!sinkResult || !sinkResult.data || sinkResult.data.length === 0) {

        return;
    }

    sinkExchange.paticipantsData = sinkResult.data.map(d => d.resultData);
};
