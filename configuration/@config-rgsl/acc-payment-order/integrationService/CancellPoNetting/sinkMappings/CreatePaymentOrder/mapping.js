'use strict';

const dateUtils = require('@config-rgsl/infrastructure/lib/DateTimeUtils');

module.exports = function mapping(input, sinkExchange) {

    const sourceDocumentBody = sinkExchange.sourceBody;
    const newDocumentBody = {};

    newDocumentBody.paymentOrderInformation = {
        paymentOrderType: sourceDocumentBody.paymentOrderInformation.paymentOrderType,
        paymentOrderSubType: sourceDocumentBody.paymentOrderInformation.paymentOrderSubType,
        referenceNumber: sourceDocumentBody.paymentOrderInformation.referenceNumber,
        paymentOrderDate: dateUtils.dateNow(),
        paymentMethod: sourceDocumentBody.paymentOrderInformation.paymentMethod,
        contractNumber: sourceDocumentBody.paymentOrderInformation.contractNumber,
        contractAmendmentNumber: sourceDocumentBody.paymentOrderInformation.contractAmendmentNumber,
        recipientNameFromBaseDocument: sourceDocumentBody.paymentOrderInformation.recipientNameFromBaseDocument,
        payerBankAccountNumber: sourceDocumentBody.paymentOrderInformation.payerBankAccountNumber,
        nonAcceptance: sourceDocumentBody.paymentOrderInformation.nonAcceptance,
        numberOfNonAcceptancePayment: sourceDocumentBody.paymentOrderInformation.numberOfNonAcceptancePayment,
        isAcquiring: sourceDocumentBody.paymentOrderInformation.isAcquiring,
        isCoolOffPeriod: sourceDocumentBody.paymentOrderInformation.isCoolOffPeriod,
        insuranceAct: sourceDocumentBody.paymentOrderInformation.insuranceAct,
        isManual: false,
        isCreatedFromNetting: true,
        originalPaymentOrderNumber: sourceDocumentBody.paymentOrderInformation.originalPaymentOrderNumber ?
            sourceDocumentBody.paymentOrderInformation.originalPaymentOrderNumber :
            input.currentPONumber,
        parentPaymentOrderNumber: input.currentPONumber
    };

    newDocumentBody.paymentOrderAmounts = {
        paymentOrderCurrencyCode: sourceDocumentBody.paymentOrderAmounts.paymentOrderCurrencyCode,
        paymentAmountInDocCurrency: sourceDocumentBody.paymentOrderNetting.totalNettingAmount,
        paymentCurrencyCode: sourceDocumentBody.paymentOrderAmounts.paymentCurrencyCode,
        exchangeRate: sourceDocumentBody.paymentOrderAmounts.exchangeRate,
        fixedExchangeRate: sourceDocumentBody.paymentOrderAmounts.fixedExchangeRate,
        useFixedExchangeRate: sourceDocumentBody.paymentOrderAmounts.useFixedExchangeRate,
        useFixedExchangeRateInitial: sourceDocumentBody.paymentOrderAmounts.useFixedExchangeRateInitial,
        originalTotalAmount: sourceDocumentBody.paymentOrderNetting.totalNettingAmount,
        totalPaymentAmount: sourceDocumentBody.paymentOrderNetting.totalNettingAmount,
        paymentDescription: sourceDocumentBody.paymentOrderAmounts.paymentDescription
    };

    newDocumentBody.recipientInformation = sourceDocumentBody.recipientInformation;

    return { body: newDocumentBody };
};

