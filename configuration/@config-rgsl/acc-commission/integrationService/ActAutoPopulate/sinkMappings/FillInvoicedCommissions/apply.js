'use strict';

const { currency } = require("@config-rgsl/infrastructure/lib/ImplConstants");
const { reduceGroupBy, compareByObjectProperties, getDistribution } = require('@config-rgsl/infrastructure/lib/ArrayUtilsImpl');
const { round } = require('@config-system/infrastructure/lib/RoundingUtils');

module.exports = function apply(sinkResult, sinkInput, sinkExchange) {

    const actItems = sinkExchange.resolveContext('actItems');
    const exchangeRates = sinkExchange.resolveContext('exchangeRates');
    const invoicedCommissions = sinkResult;

    const byCoverages = reduceGroupBy(
        actItems,
        [
            'referenceNo',
            'dueDate',
            'sourceLineId',
        ],
        'lines'
    );

    for (const itemsForInvComm of byCoverages) {
        const invoicedCommission = invoicedCommissions.items
            .filter(_ =>
                _.contractNumber === itemsForInvComm.referenceNo &&
                _.dueDate === itemsForInvComm.dueDate &&
                _.itemNo === itemsForInvComm.sourceLineId);

        const ff = invoicedCommission.map(_ => ({
            rate: _.docCommRate ?? _.aaCommRate ?? 0,
            calcCommAmount: _.calcCommAmount,
        }));
        const rates = reduceGroupBy(
            ff,
            [
                'rate',
            ],
            'lines',
            (p, c) => ({
                sum: round(p.sum + c.calcCommAmount, 2),
            }), ({
                sum: 0,
            }))
            .sort(compareByObjectProperties(['sum']))
            .reverse();

        const invoicedCommissionAmount = invoicedCommission.reduce((p, c) => p + c.calcCommAmount, 0);
        const invCommItems = itemsForInvComm.lines;
        const proportions = invCommItems.map(_ => Math.abs(_.installmentDocAmount));
        const invoicedCommissionAmounts = getDistribution(proportions, invoicedCommissionAmount);

        for (let i = 0; i < invCommItems.length; i++) {
            const item = invCommItems[i];
            const amount = invoicedCommissionAmounts[i] * Math.sign(item.lcCommAmountFinal);
            if (rates.length > 0) {
                item.invCommFinalRate = rates[0].rate;
            }
            item.invCommDocAmount = amount;
            item.invCommLcAmount = getLcAmount(item.docCurrencyCode, item.dueDate, amount, exchangeRates);
        }
    }
};

function getLcAmount(documentCurrencyCode, dueDate, amount, exchangeRates) {
    const er = exchangeRates.find(_ =>
        _.currencyCodeFrom === documentCurrencyCode &&
        _.currencyCodeTo === currency.localCurrency &&
        _.date === dueDate
    );

    return round(er.exchangeRate * amount, 2);
}
