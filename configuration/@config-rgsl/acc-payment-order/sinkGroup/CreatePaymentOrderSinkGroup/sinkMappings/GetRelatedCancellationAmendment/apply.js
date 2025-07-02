'use strict';

const { getValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');

module.exports = function apply(sinkResult, sinkInput, sinkExchange) {

    const data = getValue(sinkResult, 'data');

    if (!data || data.length === 0) {

        return;
    }

    const cancellationBody = sinkResult.data[0].resultData.body;
    const cancellationNumber = sinkResult.data[0].resultData.number;
    const cancellationCodeName = sinkResult.data[0].resultData.confName;


    sinkExchange.mapContext('cancellationBody', cancellationBody);
    sinkExchange.mapContext('cancellationNumber', cancellationNumber);
    sinkExchange.mapContext('cancellationCodeName', cancellationCodeName);
};
