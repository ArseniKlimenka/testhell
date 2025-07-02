'use strict';

const formatUtils = require('@config-rgsl/infrastructure/lib/FormatUtils');
const printoutUtils = require('@config-rgsl/acc-payment-order/lib/printoutHelper');
const {
    getValue
} = require('@config-rgsl/infrastructure/lib/ObjectUtils');

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
    const actDateTime = paymentOrderInformation.insuranceAct.signedOn.split('T');
    const bankAccount = input.body.recipientInformation.bankAccount;
    const netting = input.body.paymentOrderNetting;
    const amounts = input.body.paymentOrderAmounts;
    const hasNetting = netting.totalNettingAmount ? netting.totalNettingAmount > 0 : false;
    const nettedDocuments = getValue(netting, 'nettedDocuments', []);
    const nettedDocumentsInfo = nettedDocuments.map(item => {

        return {
            documentNo: item.documentNumber,
            amount: item.nettedAmount
        };
    });

    const output = {
        topLeftContent,
        actNumber: paymentOrderInformation.insuranceAct.actNumber,
        actSignerName: paymentOrderInformation.insuranceAct.signerFullName,
        actSignerCode: paymentOrderInformation.insuranceAct.signerPartyCode,
        actSignerDate: printoutUtils.formatSignDatePrint(actDateTime[0]),
        actSignerTime: printoutUtils.formatSignTimePrint(actDateTime[1]),
        actSignerUsername: paymentOrderInformation.insuranceAct.signerUsername,
        actExecutor: paymentOrderInformation.insuranceAct.executorFullName,
        actDateFormated: paymentOrderInformation.insuranceAct.actDate ? formatUtils.dateToStringDocumentationFormat(paymentOrderInformation.insuranceAct.actDate) : '',
        contractNumber: paymentOrderInformation.contractNumber,
        recipientPartyCode: input.body.recipientInformation.partyCodeName,
        endowmentNumber: paymentOrderInformation.referenceNumber,
        exchangeRate: amounts.exchangeRate,
        fixedExchangeRate: amounts.fixedExchangeRate,
        useFixedExchangeRate: amounts.useFixedExchangeRate,
        paymentAmount:input.body.paymentOrderAmounts.totalPaymentAmount,
        paymentAmountFormated: formatUtils.formatNumberToMoney(input.body.paymentOrderAmounts.totalPaymentAmount),
        recipientFullName: input.body.recipientInformation.partyFullName,
        recipientBankAccount: bankAccount ? bankAccount.bankAccountNumber : "",
        corrBankAccount: bankAccount ? bankAccount.correspondentBankAccount : "",
        BIC: bankAccount ? bankAccount.bankBIC : " ",
        INN: input.body.recipientInformation.innNumber,
        previousPayments: 'НЕТ',
        hasNetting: hasNetting,
        isFullNetting: hasNetting && amounts.totalPaymentAmount === 0,
        nettedDocuments: nettedDocumentsInfo
    };

    let amountStringValue = formatUtils.formatNumberToString(input.body.paymentOrderAmounts.totalPaymentAmount, input.body.paymentOrderAmounts.paymentCurrencyCode);
    amountStringValue = amountStringValue.charAt(0).toUpperCase() + amountStringValue.slice(1);
    output.paymentAmountStringValue = amountStringValue;

    return output;
};
