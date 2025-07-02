'use strict';

const { allocationDocumentType } = require('@config-rgsl/acc-base/lib/accConsts');

module.exports = function mapping(input) {
    const {
        body,
        number,
    } = input;

    const result = [
        {
            REFERENCE_NO: number,
            DOCUMENT_NO: number,
            PAYMENT_TYPE_CODE: body.paymentOrderInformation?.paymentMethod,
            CURRENCY_CODE: body.paymentOrderAmounts.paymentCurrencyCode,
            DOCUMENT_TYPE_ID: allocationDocumentType.PAYMENT_ORDER_OUTGOING,
        },
    ];

    if (body.paymentOrderInformation.numberOfNonAcceptancePayment) {
        result.push({
            REFERENCE_NO: body.paymentOrderInformation.numberOfNonAcceptancePayment,
            DOCUMENT_NO: number,
            PAYMENT_TYPE_CODE: body.paymentOrderInformation?.paymentMethod,
            CURRENCY_CODE: body.paymentOrderAmounts.paymentCurrencyCode,
            DOCUMENT_TYPE_ID: allocationDocumentType.PAYMENT_ORDER_OUTGOING,
        });
    }

    return {
        'ACC_IMPL.REFERENCE_NUMBER': result,
    };
};
