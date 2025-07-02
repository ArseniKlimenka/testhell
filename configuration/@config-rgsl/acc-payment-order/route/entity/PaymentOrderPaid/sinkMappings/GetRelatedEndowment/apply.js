'use strict';

module.exports = function apply(sinkResult, sinkInput, sinkExchange) {

    const data = sinkResult?.data;

    if (!data || data.length === 0) {

        return;
    }

    const endowmentBody = sinkResult.data[0].resultData.body;
    const endowmentNumber = sinkResult.data[0].resultData.number;

    sinkExchange.mapContext('endowmentBody', endowmentBody);
    sinkExchange.mapContext('endowmentNumber', endowmentNumber);
};
