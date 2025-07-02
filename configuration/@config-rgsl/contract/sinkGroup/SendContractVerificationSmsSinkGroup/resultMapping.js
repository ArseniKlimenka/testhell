'use strict';

module.exports = function resultMapping(sinkInput, sinkExchange) {

    const isSent = sinkExchange.resolveContext('isSent');
    const sendDate = sinkExchange.resolveContext('sendDate');
    const isOnCooldown = sinkExchange.resolveContext('isOnCooldown');
    const cooldownMinutes = sinkExchange.resolveContext('cooldownMinutes');

    return {
        isSent: isSent,
        sendDate: sendDate,
        isOnCooldown: isOnCooldown,
        cooldownMinutes: cooldownMinutes
    };
};
