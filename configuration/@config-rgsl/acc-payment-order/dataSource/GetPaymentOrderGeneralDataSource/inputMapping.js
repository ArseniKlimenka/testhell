'use strict';

module.exports = function (input) {

    const output = {};
    output.parameters = {};
    output.parameters.paymentOrderNumber = undefined;

    if (input.data.criteria.paymentOrderNumber) {

        output.parameters.paymentOrderNumber = input.data.criteria.paymentOrderNumber;
    }

    return output;
};
