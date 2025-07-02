'use strict';

module.exports = function apply(sinkResult, sinkInput, sinkExchange) {

    const attachmentId = sinkResult.attachmentId;

    if (!attachmentId) {

        throw "Unable to create investment parameters edit application attachment!";
    }

    sinkExchange.mapContext('investmentParametersEditApplicationId', attachmentId);
};
