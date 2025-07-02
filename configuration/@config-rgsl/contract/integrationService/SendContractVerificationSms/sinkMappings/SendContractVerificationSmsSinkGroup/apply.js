'use strict';

module.exports = function apply(sinkResult, sinkInput, sinkExchange) {

    sinkExchange.mapContext('sendDate', sinkResult.sendDate);
    sinkExchange.mapContext('isSent', sinkResult.isSent);
    sinkExchange.mapContext('isOnCooldown', sinkResult.isOnCooldown);
    sinkExchange.mapContext('cooldownMinutes', sinkResult.cooldownMinutes);
};
