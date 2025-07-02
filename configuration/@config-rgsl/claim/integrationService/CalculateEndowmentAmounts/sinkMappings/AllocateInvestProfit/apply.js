'use strict';

module.exports = function apply(sinkResult, sinkInput, sinkExchange) {

    if (sinkResult.AllocatedItems?.length > 0) {

        sinkExchange.allocatedItems = sinkResult.AllocatedItems;
    }
};
