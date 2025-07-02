'use strict';

module.exports = function mapping(input) {

    return {
        productCode: input.body.mainInsuranceConditions.insuranceProduct.productCode,
        contractNumbers: [input.number]
    };
};
