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
        actNumber: paymentOrderInformation.insuranceAct.actNumber,
        actDate: paymentOrderInformation.insuranceAct.actDate,
        actDateFormated: paymentOrderInformation.insuranceAct.actDate ? formatUtils.dateToStringDocumentationFormat(paymentOrderInformation.insuranceAct.actDate) : '',
        actExecutor: paymentOrderInformation.insuranceAct.executorFullName,
        actSignerCode: paymentOrderInformation.insuranceAct.signerPartyCode,
        actSignerName: paymentOrderInformation.insuranceAct.signerFullName,
        actSignerDate: printoutUtils.formatSignDatePrint(actDateTime[0]),
        actSignerTime: printoutUtils.formatSignTimePrint(actDateTime[1]),
        actSignerUsername: paymentOrderInformation.insuranceAct.signerUsername,
        claimNumber: paymentOrderInformation.referenceNumber,
        contractNumber: paymentOrderInformation.contractNumber,
        recipientPartyCode: input.body.recipientInformation.partyCodeName,
        recipientFullName: input.body.recipientInformation.partyFullName,
        recipientBankAccount: bankAccount ? bankAccount.bankAccountNumber : "",
        corrBankAccount: bankAccount ? bankAccount.correspondentBankAccount : "",
        BIC: bankAccount ? bankAccount.bankBIC : " ",
        INN: input.body.recipientInformation.innNumber,
        topLeftContent,
        previousPayments: 'НЕТ',
        paymentAmount: input.body.paymentOrderAmounts.totalPaymentAmount,
        paymentAmountFormated: formatUtils.formatNumberToMoney(input.body.paymentOrderAmounts.totalPaymentAmount, null, 2, ',', '.'),
        hasNetting: hasNetting,
        isFullNetting: hasNetting && amounts.totalPaymentAmount === 0,
        nettedDocuments: nettedDocumentsInfo
    };

    let amountStringValue = formatUtils.formatNumberToString(input.body.paymentOrderAmounts.totalPaymentAmount, input.body.paymentOrderAmounts.paymentCurrencyCode);
    amountStringValue = amountStringValue.charAt(0).toUpperCase() + amountStringValue.slice(1);
    output.paymentAmountStringValue = amountStringValue;

    return output;
};
