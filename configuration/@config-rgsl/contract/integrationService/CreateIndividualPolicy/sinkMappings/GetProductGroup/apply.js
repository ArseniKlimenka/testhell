'use strict';

module.exports = function apply(sinkResult, sinkInput, sinkExchange) {
    if (sinkResult.data.length === 0) {
        this.stopExecution('ProductCodeIsAbsent');
        return;
    }

    const record = sinkResult.data[0].resultData;

    if (!record.productGroup) {
        this.stopExecution('ProductGroupIsAbsent');
        return;
    }

    sinkExchange.mapContext('productGroup', record.productGroup);
};
