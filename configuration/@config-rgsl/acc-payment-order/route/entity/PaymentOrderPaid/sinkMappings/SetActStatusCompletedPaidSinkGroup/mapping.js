'use strict';

const { paymentOrderType } = require('@config-rgsl/acc-base/lib/paymentOrderConst');

module.exports = function mapping(input, sinkExchange, additionalDataSourcesResults) {

    const payOrder = input.body.paymentOrderInformation;

    if (payOrder.paymentOrderType === paymentOrderType.Commission) {

        return {
            actNo: payOrder.referenceNumber,
            payDate: payOrder.paymentOrderDate,
        };
    }
};
