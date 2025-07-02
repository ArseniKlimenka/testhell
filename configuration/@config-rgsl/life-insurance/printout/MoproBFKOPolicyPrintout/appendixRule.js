'use strict';

const { partnerCode, product } = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');

module.exports = function appendixRule(input) {

    const productCode = input.body?.mainInsuranceConditions?.insuranceProduct?.productCode;

    const appendix = [];

    if (productCode == product.MOPROZVBFKO) {
        appendix.push({
            name: `CommonAppendixImageContainer/img/memoMoproGenDMS.pdf`,
            mode: 'Prepend'
        });
    }

    if (productCode == product.MOPROCHEKVBFKO) {
        appendix.push({
            name: `CommonAppendixImageContainer/img/memoMoproCheckUpDMS.pdf`,
            mode: 'Prepend'
        });
    }

    return appendix;
};
