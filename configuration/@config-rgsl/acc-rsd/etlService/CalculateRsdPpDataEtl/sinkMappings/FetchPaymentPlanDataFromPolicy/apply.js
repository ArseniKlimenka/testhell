'use strict';

module.exports = function apply(sinkResult, sinkInput, sinkExchange) {

    if (sinkResult.data.length === 0) {
        return;
    }

    let ppByDate = sinkExchange.resolveContext('ppByDate');
    if (!ppByDate) {
        ppByDate = {};
        sinkExchange.mapContext('ppByDate', ppByDate);
    }

    const items = sinkResult.data.map(_ => _.resultData);
    items.forEach(_ => {
        _.contractNumber = sinkInput.input.data.criteria.contractNumber;
    });
    ppByDate[sinkInput.input.data.criteria.onDate] = items;
};
