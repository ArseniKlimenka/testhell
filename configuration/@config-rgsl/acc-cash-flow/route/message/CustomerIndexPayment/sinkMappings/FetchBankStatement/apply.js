'use strict';

module.exports = function apply(sinkResult, sinkInput, sinkExchange) {

    const requestedCount = sinkInput.input.data.criteria.bankStatementItemIds.length;
    const newPayments = sinkResult.data.map(_ => _.resultData);

    if (requestedCount !== newPayments.length) {
        throw new Error(`Wrong amount of bsi was returned: ${newPayments.length} out of ${requestedCount}.`);
    }

    const payments = sinkExchange.resolveContext('payments');
    if (payments) {
        const conc = payments.concat(newPayments);
        sinkExchange.mapContext('payments', conc);
    } else {
        sinkExchange.mapContext('payments', newPayments);
    }
};
