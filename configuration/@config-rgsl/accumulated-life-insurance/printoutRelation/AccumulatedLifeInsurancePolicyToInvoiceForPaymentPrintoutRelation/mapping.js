'use strict';

const printoutsConstant = require("@config-rgsl/life-insurance/lib/printoutsConstant");
const printoutsHelper = require("@config-rgsl/life-insurance/lib/printoutsHelper");

module.exports = function mapping(input) {

    const invoiceForPayment = printoutsHelper.getInvoiceForPaymentMapping(input, this);

    return {
        title: 'Квитанция на оплату по реквизитам',
        invoiceForPayment: invoiceForPayment
    };
};
