'use strict';

module.exports = function apply(sinkResult, sinkInput, sinkExchange) {

    sinkExchange.mapContext('sendDate', sinkResult.SendDate ?? undefined);
    sinkExchange.mapContext('isSent', sinkResult.IsSent);
    sinkExchange.mapContext('isOnCooldown', sinkResult.IsOnCooldown);
    sinkExchange.mapContext('cooldownMinutes', sinkResult.CooldownMinutes ?? undefined);
};
