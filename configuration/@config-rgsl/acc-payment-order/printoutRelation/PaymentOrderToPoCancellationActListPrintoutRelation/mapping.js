'use strict';

module.exports = function mapping(input) {

    const topLeftContent =
        '<style>' +
        '@' + 'page' + '{' +
        '@' + 'top-left' + '{' +
        'content: url("./assets/img/logoHeader.png");' +
        '}' +
        '}' +
        '</style>';

    const paymentOrderInformation = input.body.paymentOrderInformation;

    const output = {
        actNumber: paymentOrderInformation.contractNumber,
        cancellationAmendmentNumber: paymentOrderInformation.contractAmendmentNumber,
        topLeftContent
    };

    return output;
};
