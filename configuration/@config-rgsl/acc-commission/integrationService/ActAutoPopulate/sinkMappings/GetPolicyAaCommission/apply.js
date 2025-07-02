'use strict';

module.exports = function (sinkResult, sinkInput, sinkExchange) {

    const commissions = sinkResult.data.map(r => r.resultData);
    sinkExchange.mapContext('commissions', commissions);

};
