'use strict';

module.exports = function apply(sinkResult, sinkInput, sinkExchange) {

    const acts = sinkResult.data.map(_ => _.resultData);
    if (acts.length != 1) {
        throw 'required act was not found!';
    }
    sinkExchange.mapContext('act', acts[0]);
};
