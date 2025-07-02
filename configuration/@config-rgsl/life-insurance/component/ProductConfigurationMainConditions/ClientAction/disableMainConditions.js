'use strict';

module.exports = function disableMainConditions(input) {

    const productCode = input.componentContext?.insuranceProduct?.productCode;

    if (productCode) {

        return true;
    }
};
