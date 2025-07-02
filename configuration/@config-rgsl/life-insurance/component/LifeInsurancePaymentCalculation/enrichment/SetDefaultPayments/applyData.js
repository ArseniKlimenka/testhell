"use strict";

const { defaultPayments } = require('@config-rgsl/life-insurance/component/LifeInsurancePaymentCalculation/lib/paymentCalculationConsts');

module.exports = function mapping(input) {
    const body = this.businessContext.rootData;

    body.paymentCalculation = {
        paymentLines: defaultPayments
    };
};
