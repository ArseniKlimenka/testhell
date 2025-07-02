'use strict';

module.exports = function mapping(sinkInput, sinkExchange) {

    sinkExchange.globalContext.shouldSendErrorEmail = true;
    return;
};
