'use strict';

module.exports = function apply(sinkResult, sinkInput, sinkExchange) {

    const actItems = sinkResult.data.map(_ => _.resultData);

    sinkExchange.mapContext('actItems', actItems);
};
