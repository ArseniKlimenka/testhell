'use strict';

module.exports = function apply(sinkResult, sinkInput, sinkExchange) {

    if (sinkResult.data.length > 0) {

        const reinsurerName = sinkResult.data[0].resultData.fullName;
        sinkExchange.reinsurerName = reinsurerName;
    }
};
