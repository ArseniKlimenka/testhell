'use strict';

module.exports = function apply(sinkResult, sinkInput, sinkExchange) {

    if (sinkResult.data.length == 0) {

        sinkExchange.canCreateCancellation = true;
        return;
    }

    const data = sinkResult.data[0].resultData;
    if (data.amendmentType == 'NonFinancialChange') {

        sinkExchange.canCreateCancellation = true;
        sinkExchange.childDocument = data;
        return;
    }

    sinkExchange.canCreateCancellation = false;
};
