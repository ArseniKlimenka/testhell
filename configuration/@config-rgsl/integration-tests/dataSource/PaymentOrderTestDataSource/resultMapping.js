module.exports = function resultMapping(input) {

    const result = {
        paymentOrderNumber: input.PAYMENT_ORDER_NUMBER,
        paymentOrderType: input.PAYMENT_ORDER_TYPE,
        paymentOrderSubType: input.PAYMENT_ORDER_SUBTYPE,
        paymentOrderDate: input.PAYMENT_ORDER_DATE,
        stateCode: input.STATE_CODE,
        recipientCode: input.PARTY_CODE,
        totalPaymentAmount: input.PO_CURRENCY_AMOUNT,
        paymentOrderCurrencyCode: input.PO_CURRENCY_CODE,
        paymentCurrencyCode: input.PAYMENT_CURRENCY_CODE,
        isCoolOffPeriod: input.IS_COOL_OFF,
        insuranceActNumber: input.INSURANCE_ACT_NUMBER,
        referenceNumber: input.REFERENCE_NUMBER,
    };

    return result;
};
