"use strict";

module.exports = function apply(sinkResult, sinkInput, sinkExchange) {

    const activatedState = sinkResult.data.find(s => s.resultData.stateCode === "Active");
    sinkExchange.signerId = activatedState.resultData.changedByUserId;
};
