"use strict";

const {
    setAmountOfPremiumsPaid
} = require('@config-rgsl/accounting/lib/accountingCertificateHelper');

const { accCertificateIncomingSource } = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');
const dateUtils = require('@config-system/infrastructure/lib/DateUtilsCore');

module.exports = function apply(sinkResult, sinkInput, sinkExchange) {

    const body = sinkExchange.body;
    setAmountOfPremiumsPaid(body, sinkResult);

    const issueDateYear = dateUtils.getYear(body.contract?.issueDate);
    const endDateYear = dateUtils.getYear(body.contract?.endDate);
    const accountingYear = Number(body.accountingYear?.year);
    const amountOfPremiumPaid = body.paymentContract?.amountOfPremiumsPaid ?? 0;
    const isLkk = body.accountingCertificateIncomeSource === accCertificateIncomingSource.Lkk;

    const currentYear = dateUtils.currentYear();

    if (!isLkk || sinkExchange.currentCertificateNumber) {
        return;
    }

    const err1 = 'Некорректно выбран отчётный год: справку можно оформлять за текущий и 3 предыдущих года';
    const err2 = 'Некорректно выбран отчётный год: договор не действовал в выбранный период';
    const err3 = 'Некорректно выбран отчётный год: за указанный год отсутствуют расходы на уплату страховых взносов';

    if (accountingYear > currentYear) {
        throw new Error(err1);
    }
    else if (accountingYear < currentYear - 3) {
        throw new Error(err1);
    }
    else if (accountingYear < issueDateYear) {
        throw new Error(err2);
    }
    else if (accountingYear > endDateYear) {
        throw new Error(err2);
    }
    else if (amountOfPremiumPaid === 0) {
        throw new Error(err3);
    }
};
