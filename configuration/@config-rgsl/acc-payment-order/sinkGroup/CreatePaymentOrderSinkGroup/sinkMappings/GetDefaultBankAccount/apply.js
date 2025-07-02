'use strict';

module.exports = function apply(sinkResult, sinkInput, sinkExchange) {

    if (sinkResult.data && sinkResult.data.length > 0) {
        sinkExchange.defaultBankAccountNo = sinkResult.data.map(r => r.resultData)[0].accountNo;
    }

};
