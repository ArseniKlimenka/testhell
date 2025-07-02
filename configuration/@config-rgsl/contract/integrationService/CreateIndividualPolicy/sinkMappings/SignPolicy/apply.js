'use strict';

module.exports = function apply(sinkResult, sinkInput, sinkExchange) {
    sinkExchange.mapContext('hasTransitioned', sinkResult.hasTransitioned);
};
