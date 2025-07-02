'use strict';

const formatUtils = require('@config-rgsl/infrastructure/lib/FormatUtils');
const printoutUtils = require('@config-rgsl/acc-payment-order/lib/printoutHelper');

module.exports = function mapping(input) {

    const topLeftContent =
        '<style>' +
        '@' + 'page' + '{' +
        '@' + 'top-left' + '{' +
        'content: url("./img/logoHeader.png");' +
        '}' +
        '}' +
        '</style>';

    const paymentOrderInformation = input.body.paymentOrderInformation;

    const output = {
        actNumber: paymentOrderInformation.insuranceAct.actNumber,
        claimNumber: paymentOrderInformation.referenceNumber,
        topLeftContent
    };

    return output;
};
