"use strict";

const { insuredEventType } = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');
const printoutUtils = require('@config-rgsl/acc-payment-order/lib/printoutHelper');

module.exports = function mapping(input, result) {

    if (!result) {

        return;
    }

    if (result.errorResponse?.code) {

        throw `${result.errorResponse.message} ${result.errorResponse.additionalErrorData?.message}`;
    }

    const contractData = result.contractData;
    input.contractIssueDate = contractData.contractIssueDate;
    input.contractIssueDateFormated = contractData.contractIssueDateFormated;
    input.contractType = contractData.contractType;
    input.holderFullName = contractData.holderFullName;
    input.insuredFullName = contractData.insuredFullName;
    input.contractCurrency = contractData.contractCurrency;
    input.contractCurrencyDescription = contractData.contractCurrencyDescription;
    input.riskBusinessLine = contractData.riskBusinessLine;

    const endowmentData = result.endowmentData;
    input.beneficiaryReason = beneficiaryReasonToGenitiveCase(endowmentData.beneficiaryReason);
    input.statementApplicationDate = endowmentData.statementApplicationDate;
    input.realtedEndowments = endowmentData.realtedEndowments;
    input.eventType = endowmentData.eventType;
    input.eventReason = endowmentData.eventReason;
    input.surrenderValueAmountInRub = endowmentData.surrenderValueAmountInRub;
    input.debtAmountInRub = endowmentData.debtAmountInRub;
    input.pitAmountInRub = endowmentData.pitAmountInRub;
    input.investProfitAmountInRub = endowmentData.investProfitAmountInRub;
    input.investProfitAnnualAmountInRub = endowmentData.investProfitAnnualAmountInRub;
    input.investProfitCouponAmountInRub = endowmentData.investProfitCouponAmountInRub;
    input.dividendsAmountInRub = endowmentData.dividendsAmountInRub;
    input.investProfitTotalAmountInRub = endowmentData.investProfitTotalAmountInRub;
    input.riskCode = endowmentData.riskCode;
    input.beneficiaryPaymentType = endowmentData.beneficiaryPaymentType;
    input.previousPayments = !!result.previousPayments && result.previousPayments.length > 0 ? result.previousPayments : 'НЕТ';

    const eventDate = endowmentData.eventDate ? printoutUtils.formatDatePrint(endowmentData.eventDate) : '';
    const eventTypeCode = endowmentData.eventTypeCode;
    input.actHeader = getActHeader(eventTypeCode, input.contractIssueDateFormated, eventDate);
};

function beneficiaryReasonToGenitiveCase(beneficiaryReason) {

    switch (beneficiaryReason?.toLowerCase()) {

        case 'выгодоприобретатель по договору страхования':
            return 'Выгодоприобретателя по договору страхования';
    }

    return beneficiaryReason;
}

function getActHeader(eventTypeCode, contractIssueDateFormated, eventDate) {

    switch (eventTypeCode) {

        case insuredEventType.did.code.toString():
            return `Выплата дополнительного инвестиционного дохода, на основании заявления от ${contractIssueDateFormated}`;

        case insuredEventType.survival.code.toString():
            return `Дожитие застрахованного лица до даты, указанной в договоре страхования ${eventDate} на основании заявления, поступившего ${contractIssueDateFormated}`;
    }

    return '';
}
