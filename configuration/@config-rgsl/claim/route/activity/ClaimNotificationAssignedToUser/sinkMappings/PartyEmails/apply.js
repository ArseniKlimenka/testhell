'use strict';

module.exports = function mapping(sinkResult, sinkInput, sinkExchange) {

    if (sinkResult.data && sinkResult.data.length > 0) {
        sinkExchange.partyEmails = sinkResult.data.map(item => item.resultData.email);
    }

};
