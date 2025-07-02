'use strict';

const dateUtils = require('@config-rgsl/infrastructure/lib/DateTimeUtils');

module.exports = function mapping(initialDocument) {

    const newDocument = {};

    newDocument.paymentOrderInformation = {
        paymentOrderType: initialDocument.paymentOrderInformation.paymentOrderType,
        paymentOrderSubType: initialDocument.paymentOrderInformation.paymentOrderSubType,
        referenceNumber: initialDocument.paymentOrderInformation.referenceNumber,
        paymentOrderDate: dateUtils.dateNow(),
        paymentMethod: initialDocument.paymentOrderInformation.paymentMethod,
        contractNumber: initialDocument.paymentOrderInformation.contractNumber,
        contractAmendmentNumber: initialDocument.paymentOrderInformation.contractAmendmentNumber,
        recipientNameFromBaseDocument: initialDocument.paymentOrderInformation.recipientNameFromBaseDocument,
        payerBankAccountNumber: initialDocument.paymentOrderInformation.payerBankAccountNumber,
        nonAcceptance: initialDocument.paymentOrderInformation.nonAcceptance,
        numberOfNonAcceptancePayment: initialDocument.paymentOrderInformation.numberOfNonAcceptancePayment,
        isAcquiring: initialDocument.paymentOrderInformation.isAcquiring,
        isCoolOffPeriod: initialDocument.paymentOrderInformation.isCoolOffPeriod,
        insuranceAct: initialDocument.paymentOrderInformation.insuranceAct,
        isManual: true
    };

    newDocument.paymentOrderAmounts = {
        paymentOrderCurrencyCode: initialDocument.paymentOrderAmounts.paymentOrderCurrencyCode,
        paymentAmountInDocCurrency: 0,
        paymentCurrencyCode: initialDocument.paymentOrderAmounts.paymentCurrencyCode,
        exchangeRate: initialDocument.paymentOrderAmounts.exchangeRate,
        fixedExchangeRate: initialDocument.paymentOrderAmounts.fixedExchangeRate,
        useFixedExchangeRate: initialDocument.paymentOrderAmounts.useFixedExchangeRate,
        useFixedExchangeRateInitial: initialDocument.paymentOrderAmounts.useFixedExchangeRateInitial,
        originalTotalAmount: 0,
        totalPaymentAmount: 0,
        paymentDescription: initialDocument.paymentOrderAmounts.paymentDescription
    };

    newDocument.recipientInformation = initialDocument.recipientInformation;

    return { body: newDocument };
};
