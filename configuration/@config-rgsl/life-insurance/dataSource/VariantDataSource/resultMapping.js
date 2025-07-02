'use strict';

module.exports = function resultMapping(input) {

    const output = {};

    output.productCode = input.PRODUCT_CODE;
    output.variantCode = input.VARIANT_CODE;
    output.variantDescription = input.VARIANT_CODE_DESCRIPTION;

    return output;

};
