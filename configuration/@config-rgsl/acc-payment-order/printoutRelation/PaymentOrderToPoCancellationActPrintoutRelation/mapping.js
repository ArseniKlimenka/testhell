'use strict';

const formatUtils = require('@config-rgsl/infrastructure/lib/FormatUtils');
const printoutUtils = require('@config-rgsl/acc-payment-order/lib/printoutHelper');
const dateHelper = require('@config-rgsl/infrastructure/lib/DateTimeUtils');
const printoutsHelper = require("@config-rgsl/life-insurance/lib/printoutsHelper");

module.exports = function mapping(input) {

    const topLeftContent =
        '<style>' +
        '@' + 'page' + '{' +
        '@' + 'top-left' + '{' +
        'content: url("./assets/img/logoHeader.png");' +
        '}' +
        '}' +
        '</style>';

    const {
        body
    } = printoutsHelper.getPrintoutCommonData(input, this);

    const paymentOrderInformation = body.paymentOrderInformation;
    const recipientInformation = body.recipientInformation;
    const bankAccount = body.recipientInformation?.bankAccount;
    const paymentOrderAmounts = body.paymentOrderAmounts;
    let totalPaymentAmountStringValue = formatUtils.formatNumberToString(paymentOrderAmounts?.totalPaymentAmount, paymentOrderAmounts?.paymentCurrencyCode);
    totalPaymentAmountStringValue = totalPaymentAmountStringValue?.charAt(0)?.toUpperCase() + totalPaymentAmountStringValue?.slice(1);

    const actDateTime = paymentOrderInformation?.insuranceAct?.signedOn?.split('T');
    const actDateFormated = dateHelper.newDateAsString(dateHelper.DateFormats.ECMASCRIPT); // Ставим нынешнюю дату.
    const paymentOrderNumber = this.businessContext?.documentNumber;

    const output = {

        topLeftContent,
        contractAmendmentNumber: paymentOrderInformation?.contractAmendmentNumber,
        contractNumber: paymentOrderInformation?.contractNumber,
        actNumber: paymentOrderInformation?.insuranceAct?.actNumber,
        actDateFormated: formatUtils.dateToStringDocumentationFormat(actDateFormated),
        actSignerName: paymentOrderInformation?.insuranceAct?.signerFullName,
        actSignerCode: paymentOrderInformation?.insuranceAct?.signerPartyCode,
        actSignerUsername: paymentOrderInformation.insuranceAct?.signerUsername,
        actSignerDate: printoutUtils.formatSignDatePrint(actDateTime[0]),
        actSignerTime: printoutUtils.formatSignTimePrint(actDateTime[1]),
        actExecutor: paymentOrderInformation?.insuranceAct?.executorFullName,

        paymentBasis: 'Досрочное прекращение договора страхования',
        totalPaymentAmount: paymentOrderAmounts?.totalPaymentAmount,
        paymentAmountStringValue: totalPaymentAmountStringValue,
        recipientFullName: recipientInformation?.partyFullName,
        recipientPartyCode: body.recipientInformation?.partyCodeName,
        recipientBankName: bankAccount ? bankAccount?.bankName : "",
        corrBankAccount: bankAccount ? bankAccount?.correspondentBankAccount : "",
        recipientBankAccount: bankAccount ? bankAccount?.bankAccountNumber : "",
        BIC: bankAccount ? bankAccount?.bankBIC : " ",
        beneficiaryReason: "Заявление страхователя",
        endowmentNumber: paymentOrderInformation?.referenceNumber,
        paymentOrderDate: dateHelper.formatDate(paymentOrderInformation?.paymentOrderDate),
        paymentOrderNumber: paymentOrderNumber,
        paymentOrderNetting: body.paymentOrderNetting?.nettedDocuments
    };
    return output;
};
