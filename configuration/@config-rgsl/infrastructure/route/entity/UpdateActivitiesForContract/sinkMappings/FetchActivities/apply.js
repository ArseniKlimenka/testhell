'use strict';

module.exports = function apply(sinkResult, sinkInput, sinkExchange) {

    const activities = sinkResult.data.map(_ => _.resultData);

    sinkExchange.mapContext('activities', activities);
};
