'use strict';

module.exports = function apply(sinkResult, sinkInput, sinkExchange, additionalDataSourcesResults) {

    if (!sinkResult || !sinkResult.data || sinkResult.data.length === 0) {

        return;
    }

    sinkExchange.paticipantsData = sinkResult.data;
};
