'use strict';

const { nullCheck } = require('@config-rgsl/infrastructure/lib/ObjectUtils');

module.exports = function resultMapping(input) {

    const output = {};

    output.paymentOrderNumber = nullCheck(input.PAYMENT_ORDER_NUMBER);
    output.stateCode = nullCheck(input.STATE_CODE);

    return output;
};
