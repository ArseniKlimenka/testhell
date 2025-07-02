'use strict';

const { reduceGroupBy, getDistribution } = require('@config-rgsl/infrastructure/lib/ArrayUtilsImpl');
const { round } = require('@config-system/infrastructure/lib/RoundingUtils');

module.exports = function mapping(sinkInput, sinkExchange) {
    const ppItems = sinkExchange.resolveContext('ppItems');

    const fields = [
        'contractNumber',
        'dueDate',
        'objectCode',
        'rsdRate',
    ];
    const items = reduceGroupBy(ppItems, fields, 'lines', (p, c) => ({
        openAmount: round(p.openAmount + c.openAmount, 2),
        openAmountNoRsd: round(p.openAmountNoRsd + c.openAmountNoRsd, 2),
    }), {
        openAmount: 0,
        openAmountNoRsd: 0,
    });
    items.forEach(_ => {
        const rsdAmount = round(_.openAmountNoRsd * _.rsdRate, 2);
        const proportions = _.lines.map(_ => _.openAmount);
        const rsdAmounts = getDistribution(proportions, rsdAmount);

        for (let i = 0; i < _.lines.length; i++) {
            _.lines[i].rsdAmount = rsdAmounts[i];
        }
    });

    const link = ppItems.map(_ => ({
        RSD_NUMBER: sinkInput.rsdNumber,
        CONTRACT_NUMBER: _.contractNumber,
        DUE_DATE: _.dueDate,
        OBJECT_CODE: _.objectCode,
        ITEM_NO: _.itemNo,
    }));

    const sat = ppItems.map(_ => ({
        RSD_NUMBER: sinkInput.rsdNumber,
        CONTRACT_NUMBER: _.contractNumber,
        DUE_DATE: _.dueDate,
        OBJECT_CODE: _.objectCode,
        ITEM_NO: _.itemNo,
        POSTING_DATE: _.postingDate,
        DEADLINE_DATE: _.deadlineDate,
        OVERDUE_DAYS: _.overdueDays,
        AMOUNT: _.amount,
        OPEN_AMOUNT: _.openAmount,
        OPEN_AMOUNT_NO_RSD: _.openAmountNoRsd,
        RSD_RATE: _.rsdRate,
        RSD_AMOUNT: _.rsdAmount,
    }));

    sat.push({
        RSD_NUMBER: sinkInput.rsdNumber,
        $deleted: true,
    });

    return {
        'ACC_IMPL.RSD_ITEM_LINK': link,
        'ACC_IMPL.RSD_ITEM_SAT': sat,
    };
};
