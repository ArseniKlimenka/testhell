'use strict';

const { nullCheck } = require('@config-rgsl/infrastructure/lib/ObjectUtils');

module.exports = function resultMapping(input) {

    const output = {};

    output.mvzNumber = nullCheck(input.MVZ_NUMBER);
    output.orderNumber = nullCheck(input.ORDER_NUMBER);

    return output;
};
