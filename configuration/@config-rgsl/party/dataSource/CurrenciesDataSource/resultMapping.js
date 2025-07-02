'use strict';

module.exports = function resultMapping(input) {

    const output = {};

    output.currencyCode = input.CURRENCY_CODE;
    output.currencyDesc = input.DESCRIPTION;
    output.currencyNumericCode = input.ISO_NUMERIC_CODE;

    return output;

};
