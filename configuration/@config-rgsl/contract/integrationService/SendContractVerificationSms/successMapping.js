'use strict';

module.exports = function mapping({input, sinkExchange, additionalDataSources}) {

    const isSent = sinkExchange.resolveContext('isSent');
    const sendDate = sinkExchange.resolveContext('sendDate');
    const isOnCooldown = sinkExchange.resolveContext('isOnCooldown');
    const cooldownMinutes = sinkExchange.resolveContext('cooldownMinutes');

    const successResponse = {
        isSent: isSent,
        sendDate: sendDate,
        isOnCooldown: isOnCooldown,
        cooldownMinutes: cooldownMinutes
    };

    return successResponse;
};
