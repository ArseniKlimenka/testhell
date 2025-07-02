'use strict';

module.exports = function apply(sinkResult, sinkInput, sinkExchange) {

    if (sinkResult?.data?.length > 0) {

        const resultData = sinkResult.data[0].resultData;
        sinkExchange.initiator = {
            actualEmail: resultData.actualEmail
        };
    }
};
