'use strict';

const { paymentOrderType } = require('@config-rgsl/acc-base/lib/paymentOrderConst');
const { allocationDocumentType } = require('@config-rgsl/acc-base/lib/accConsts');

module.exports = function mapping(input, sinkExchange) {
    const {
        body,
        number,
    } = input;

    if (![paymentOrderType.PaymentRefund, paymentOrderType.PolicyCancellation].includes(body.paymentOrderInformation.paymentOrderType)) {
        return;
    }

    const currencyCode = input.body.paymentOrderAmounts.paymentOrderCurrencyCode;

    return {
        'ACC_IMPL.REFERENCE_NUMBER': [
            {
                REFERENCE_NO: number + '-IN',
                DOCUMENT_NO: number,
                PAYMENT_TYPE_CODE: body.paymentOrderInformation?.paymentMethod,
                CURRENCY_CODE: currencyCode,
                DOCUMENT_TYPE_ID: allocationDocumentType.PAYMENT_ORDER_INCOMING,
            },
        ]
    };
};

