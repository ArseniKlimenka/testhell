'use strict';

const { currency } = require("@config-rgsl/infrastructure/lib/ImplConstants");
const { reduceGroupBy, getDistribution } = require('@config-rgsl/infrastructure/lib/ArrayUtilsImpl');
const { commissionActItemStatusId } = require('@config-rgsl/acc-base/lib/actConsts');
const { round } = require('@config-system/infrastructure/lib/RoundingUtils');

module.exports = function apply(sinkResult, sinkInput, sinkExchange) {

    const sequences = sinkResult.find(r => r.sequenceName === 'ACC_IMPL.CA_ACT_ITEM');
    const ids = sequences.ids;
    const act = sinkExchange.resolveContext('act');
    const items = sinkExchange.resolveContext('items');
    const exchangeRates = sinkExchange.resolveContext('exchangeRates');
    const renew = sinkExchange.resolveContext('renew');
    const vatRate = sinkExchange.resolveContext('vatRate');

    const actItems = [];
    const actItemPcs = [];
    sinkExchange.mapContext('actItems', actItems);
    sinkExchange.mapContext('actItemPcs', actItemPcs);

    for (let i = 0; i < items.length; i++) {
        const item = items[i];

        const docCurrencyCode = item.lines[0].docCurrencyCode;
        const paymentTransactionDate = item.lines[0].paymentTransactionDate;

        const actItem = {
            actItemId: ids[i],
            actId: act.actId,
            statusId: renew ? commissionActItemStatusId.RENEW : commissionActItemStatusId.NEW,
            referenceNo: item.documentNo,
            sourceLineId: item.sourceLineId,
            docCurrencyCode: docCurrencyCode,
            paymentTransactionDate: paymentTransactionDate,
            dueDate: item.installmentDueDate,
            bankStatementItemId: item.bankStatementItemId,

            paymentDocAmount: item.lines.reduce((p, c) => p + c.matchingDocAmount, 0),

            aaCommRate: item.aaCommRate,
            docCommRate: item.docCommRate,

            aaExpensesRate: item.aaExpensesRate,
            aaNaturalPersonRate: item.aaNaturalPersonRate,
            aaSolePropriatorRate: item.aaSolePropriatorRate,

            commRateManual: item.manualCommRate,
            commRateFinal: item.manualCommRate ?? item.docCommRate ?? item.aaCommRate,
            commRateCalc: item.docCommRate ?? item.aaCommRate,

            expensesRateFinal: item.docExpensesRate ?? item.aaExpensesRate,
            naturalPersonRateFinal: item.docNaturalPersonRate ?? item.aaNaturalPersonRate,
            solePropriatorRateFinal: item.docSolePropriatorRate ?? item.aaSolePropriatorRate,

            isTechnical: item.isTechnical,
        };

        actItem.paymentLcAmount = getLcAmount(actItem.docCurrencyCode, actItem.dueDate, actItem.paymentDocAmount, exchangeRates);

        actItem.expensesAmount = round(actItem.paymentDocAmount * actItem.expensesRateFinal, 2);
        actItem.naturalPersonAmount = round(actItem.paymentDocAmount * actItem.naturalPersonRateFinal, 2);
        actItem.solePropriatorAmount = round(actItem.paymentDocAmount * actItem.solePropriatorRateFinal, 2);

        actItems.push(actItem);

        const newActItemPcs = item.lines.map(_ => ({
            actId: actItem.actId,
            actItemId: actItem.actItemId,
            payableCommissionId: _.payableCommissionId,
        }));
        actItemPcs.push(...newActItemPcs);
    }

    calculateAmountsForInstallments(actItems);
    calculateVatAmountsByInstallments(vatRate, actItems);
};

function calculateAmountsForInstallments(actItems) {

    const itemsByInstallments = reduceGroupBy(
        actItems,
        [
            'referenceNo',
            'dueDate',
            'commRateFinal',
        ],
        'lines'
    );

    for (const itemsByInstallment of itemsByInstallments) {
        const installmentActItems = itemsByInstallment.lines;
        const paymentLcAmount = installmentActItems.reduce((p, c) => p + c.paymentLcAmount, 0);
        const installmentLcCommAmountFinal = round(paymentLcAmount * itemsByInstallment.commRateFinal, 2);

        const proportions = installmentActItems.map(_ => Math.abs(_.paymentDocAmount));
        const commissionAmounts = getDistribution(proportions, installmentLcCommAmountFinal);

        for (let i = 0; i < installmentActItems.length; i++) {
            const actItem = installmentActItems[i];
            const amount = commissionAmounts[i];
            actItem.lcCommAmountFinal = amount;
        }
    }

    const itemsByInstallmentCalc = reduceGroupBy(
        actItems,
        [
            'referenceNo',
            'dueDate',
            'commRateCalc',
        ],
        'lines'
    );
    for (const itemsByInstallment of itemsByInstallmentCalc) {
        const installmentActItems = itemsByInstallment.lines;
        const paymentLcAmount = installmentActItems.reduce((p, c) => p + c.paymentLcAmount, 0);
        const installmentLcCommAmountFinal = round(paymentLcAmount * itemsByInstallment.commRateCalc, 2);

        const proportions = installmentActItems.map(_ => Math.abs(_.paymentDocAmount));
        const commissionAmounts = getDistribution(proportions, installmentLcCommAmountFinal);

        for (let i = 0; i < installmentActItems.length; i++) {
            const actItem = installmentActItems[i];
            const amount = commissionAmounts[i];
            actItem.lcCommAmountCalc = amount;
        }
    }
}

function calculateVatAmountsByInstallments(vatRate, actItems) {
    const itemsByInstallments = reduceGroupBy(
        actItems,
        [
            'referenceNo',
            'dueDate',
            'commRateFinal',
        ],
        'lines'
    );

    for (const itemsByInstallment of itemsByInstallments) {
        const installmentActItems = itemsByInstallment.lines;
        const commLcAmount = installmentActItems.reduce((p, c) => p + c.lcCommAmountFinal, 0);
        const lcVatAmount = round((commLcAmount * vatRate) / (1 + vatRate), 2);

        const proportions = installmentActItems.map(_ => Math.abs(_.paymentDocAmount ?? _.lcCommAmountFinal));
        const vatAmounts = getDistribution(proportions, lcVatAmount);

        for (let i = 0; i < installmentActItems.length; i++) {
            const actItem = installmentActItems[i];
            const vatAmount = vatAmounts[i];
            actItem.lcVatAmount = vatAmount;
        }
    }
}

function getLcAmount(documentCurrencyCode, dueDate, amount, exchangeRates) {
    const er = exchangeRates.find(_ =>
        _.currencyCodeFrom === documentCurrencyCode &&
        _.currencyCodeTo === currency.localCurrency &&
        _.date === dueDate
    );

    return round(er.exchangeRate * amount, 2);
}
