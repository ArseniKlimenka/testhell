'use strict';

module.exports = function apply(sinkResult, sinkInput, sinkExchange) {

    const pp = sinkResult.data.map(_ => _.resultData);

    if (pp.length > 0) {
        sinkExchange.mapContext('pp', pp);
    }
};
