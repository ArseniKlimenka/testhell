'use strict';

module.exports = function mapping(input) {

    const commonBody = {};

    commonBody.paymentInformation = {};
    commonBody.paymentInformation.originalPaymentAmount = input.paymentOrderAmounts.paymentAmountInDocCurrency;
    commonBody.paymentInformation.amountToPay = input.paymentOrderAmounts.totalPaymentAmount;
    commonBody.paymentInformation.paymentDate = input.paymentOrderInformation.paymentOrderDate;
    commonBody.paymentInformation.insuranceAct = input.paymentOrderInformation.insuranceAct;

    commonBody.paymentInformation.isCanelledNetting = input.paymentOrderInformation.isCanelledNetting;
    commonBody.paymentInformation.isCreatedFromNetting = input.paymentOrderInformation.isCreatedFromNetting;
    commonBody.paymentInformation.originalPaymentOrderNumber = input.paymentOrderInformation.originalPaymentOrderNumber;
    commonBody.paymentInformation.parentPaymentOrderNumber = input.paymentOrderInformation.parentPaymentOrderNumber;
    commonBody.paymentInformation.isManual = input.paymentOrderInformation.isManual;

    commonBody.payerInformation = {};
    commonBody.payerInformation.payerBankAccount = input.paymentOrderInformation.payerBankAccountNumber;
    commonBody.payerInformation.paymentType = input.paymentOrderInformation.paymentMethod;
    commonBody.payerInformation.paymentOrderType = input.paymentOrderInformation.paymentOrderType;
    commonBody.payerInformation.currency = input.paymentOrderAmounts.paymentOrderCurrencyCode;

    commonBody.recipientInformation = {};
    commonBody.recipientInformation.code = input.recipientInformation.partyCodeName;
    commonBody.recipientInformation.fullName = input.recipientInformation.partyFullName;
    commonBody.recipientInformation.taxNumber = input.recipientInformation.innNumber;
    commonBody.recipientInformation.bankAccount = input.recipientInformation.bankAccountNumber;

    commonBody.attributes = {};
    commonBody.attributes.paymentOrderInformation = input.paymentOrderInformation;
    commonBody.attributes.recipientInformation = input.recipientInformation;
    commonBody.attributes.paymentOrderAmounts = input.paymentOrderAmounts;
    commonBody.attributes.paymentOrderNetting = input.paymentOrderNetting;
    commonBody.attributes.paymentOrderItems = input.paymentOrderItems;

    return commonBody;
};
