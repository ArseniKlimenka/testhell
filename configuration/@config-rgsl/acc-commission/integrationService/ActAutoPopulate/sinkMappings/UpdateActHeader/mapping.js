'use strict';

module.exports = function mapping(sinkInput, sinkExchange) {

    const act = sinkExchange.resolveContext('act');

    return {
        request: {
            actId: act.actId,
        }
    };
};
