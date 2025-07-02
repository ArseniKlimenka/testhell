'use strict';

module.exports = function apply(sinkResult, sinkInput, sinkExchange) {

    if (sinkResult.NettedItems.length > 0) {

        sinkExchange.mapContext('nettedItems', sinkResult.NettedItems);
    }
};
