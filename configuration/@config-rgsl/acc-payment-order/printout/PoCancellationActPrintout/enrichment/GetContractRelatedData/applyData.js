"use strict";

const { recipientPaymentType } = require('@config-rgsl/life-insurance/lib/amendmentConstants');


module.exports = function mapping(input, result) {

    if (!result) {

        return;
    }

    if (result.errorResponse?.code) {

        throw `${result.errorResponse.message} ${result.errorResponse.additionalErrorData?.message}`;
    }

    const contractData = result.contractData;
    input.contractIssueDateFormated = contractData.contractIssueDateFormated;
    input.contractStartDateFormated = contractData.contractStartDateFormated;
    input.contractType = contractData.contractType;
    input.holderFullName = contractData.holderFullName;
    input.insuredFullName = contractData.insuredFullName;
    input.contractCurrency = contractData.contractCurrency;
    input.contractCurrencyDescription = contractData.contractCurrencyDescription;

    const amendmentData = result.amendmentData;
    input.surrenderValue = amendmentData.surrenderValue;
    input.investProfit = amendmentData.investProfit;
    input.pitAmountInRub = amendmentData.pitAmountInRub;
    input.debt = amendmentData.debt;

    const canellationRecipients = amendmentData.canellationRecipients;

    input.insurancePaymentForm = getInsurancePaymentFormString(
        input.paymentOrderNumber,
        input.contractNumber,
        canellationRecipients,
        input.paymentOrderNetting);

    input.previousPayments = !!result.previousPayments && result.previousPayments.length > 0 ? result.previousPayments : 'НЕТ';
};

function getInsurancePaymentFormString(paymentOrderNumber, contractNumber, canellationRecipients, paymentOrderNetting) {

    let insurancePaymentForm = '';

    const linkedCanellationRecipient = canellationRecipients?.find(element => element.assignedPaymentOrderNumber == paymentOrderNumber);
    const insurancePaymentForms = [];

    switch (linkedCanellationRecipient?.recipientPaymentType?.code) {

        // Если ФОРМА ВЫПЛАТЫ - 'На расчетный счет'
        case recipientPaymentType.bankAccount:

            insurancePaymentForm = `Безналичный перевод на расчетный счет Страхователя в размере ${linkedCanellationRecipient?.amountToPayInRubCurrency} руб.`;
            break;

        // Если ФОРМА ВЫПЛАТЫ - 'В счёт оплаты взноса'
        case recipientPaymentType.nettingPayment:

            paymentOrderNetting?.forEach(element => {

                insurancePaymentForms.push(`Зачисление в счет оплаты взноса по договору ${contractNumber} в размере ${element.nettedAmountInDocCurrency} руб.`);
            });
            insurancePaymentForm = insurancePaymentForms.join('<br>');
            break;
    }

    return insurancePaymentForm;
}
