'use strict';

module.exports = function apply(sinkResult, sinkInput, sinkExchange) {

    if (!sinkResult && sinkResult.length === 0) {

        throw 'Attachments info data not found!';
    }

    sinkExchange.mapContext('printoutsInfo', sinkResult);
};
