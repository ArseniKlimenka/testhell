'use strict';

module.exports = function apply(sinkResult, sinkInput, sinkExchange) {

    const lastInvoicedCommission = sinkResult.data.map(_ => _.resultData);
    sinkExchange.mapContext('lastInvoicedCommission', lastInvoicedCommission);
};
