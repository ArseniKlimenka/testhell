'use strict';

module.exports = function resultMapping(input) {

    const output = {};

    output.loadDate = input.LOAD_DATE;
    output.productCode = input.PRODUCT_CODE;

    return output;

};
