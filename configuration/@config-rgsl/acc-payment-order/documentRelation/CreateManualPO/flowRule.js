'use strict';

const { getValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');
const { paumentOrderManualTypes } = require('@config-rgsl/acc-payment-order/lib/paymentOrderInternalConst');


module.exports = function rule(input) {

    const isManual = getValue(input.body, "paymentOrderInformation.isManual", false);
    const paymentOrderType = getValue(input.body, "paymentOrderInformation.paymentOrderType");

    return !isManual && paumentOrderManualTypes.includes(paymentOrderType);
};
