'use strict';

module.exports = function resultMapping(sinkInput, sinkExchange) {

    const sendToPaid = !!sinkExchange.resolveContext("sendToPaid");

    return {
        shouldSendToPaid: sendToPaid
    };
};
