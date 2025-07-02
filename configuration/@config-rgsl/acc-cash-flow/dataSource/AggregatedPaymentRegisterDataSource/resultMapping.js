module.exports = function resultMapping(input) {

    const smallPayments = input.map(item => {
        return {
            aggregatedPaymentRegisterId: item.AGGREGATED_PAYMENT_REGISTER_ID,
            aggregatedPaymentNumber: item.AGGREGATED_PAYMENT_NUMBER,
            bankStatementNo: item.BANK_STATEMENT_NUMBER,
            smallPaymentNumber: item.SMALL_PAYMENT_NUMBER,
            paymentDate: item.PAYMENT_DATE,
            payerFullName: item.PAYER_FULL_NAME,
            paymentDescription: item.PAYMENT_DESCRIPTION,
            contractBeginDate: item.CONTRACT_BEGIN_DATE,
            productName: item.PRODUCT_NAME,
            paymentAmount: item.PAYMENT_AMOUNT,
            currencyCode: item.CURRENCY_CODE,
            contractDuration: item.CONTRACT_DURATION,
            additionalInformation: item.ADDITIONAL_INFORMATION,
            segment: item.SEGMENT,
            hasPayment: item.HAS_PAYMENT,
        };
    });

    return smallPayments;
};
