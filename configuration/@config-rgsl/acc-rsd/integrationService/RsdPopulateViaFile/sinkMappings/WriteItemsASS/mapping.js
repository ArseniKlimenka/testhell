'use strict';

const { reduceGroupBy, getDistribution } = require('@config-rgsl/infrastructure/lib/ArrayUtilsImpl');
const { round } = require('@config-system/infrastructure/lib/RoundingUtils');

module.exports = function mapping(sinkInput, sinkExchange) {
    const manualItems = sinkExchange.resolveContext('manualItems');
    const ppItemsData = sinkExchange.resolveContext('ppItems') ?? [];
    const ppRsdItemsData = sinkExchange.resolveContext('ppRsdItems');
    const failedItems = [];

    for (const manualItem of manualItems) {
        const ppItems = ppItemsData.filter(_ => _.contractNumber === manualItem.contractNumber && _.dueDate === manualItem.dueDate);
        let ppRsdItems = ppRsdItemsData.filter(_ => _.contractNumber === manualItem.contractNumber && _.dueDate === manualItem.dueDate);

        if (ppRsdItems.length === 0 && ppItems.length === 0) {
            failedItems.push({
                contractNumber: manualItem.contractNumber,
                dueDate: manualItem.dueDate,
                message: 'Payment plan was not found!',
            });
            continue;
        }

        if (ppRsdItems.length === 0) {
            const newPpRsdItems = ppItems.map(_ => ({
                contractNumber: _.contractNumber,
                dueDate: _.dueDate,
                objectCode: _.objectCode,
                itemNo: _.itemNo,
                postingDate: _.postingDate,
                deadlineDate: _.deadlineDate,
                overdueDays: 0,
                amount: _.amount,
                openAmount: _.openAmount,
                openAmountNoRsd: _.openAmountNoRsd,
                rsdRate: 0,
                rsdAmount: 0,
            }));
            ppRsdItems = newPpRsdItems;
            ppRsdItemsData.push(...newPpRsdItems);
        }

        const proportions = ppRsdItems.map(_ => _.amount);
        const rsdAmountsManual = getDistribution(proportions, manualItem.rsdAmount);
        for (let i = 0; i < ppRsdItems.length; ++i) {
            ppRsdItems[i].rsdAmountManual = rsdAmountsManual[i];
        }
    }

    const fields = [
        'contractNumber',
        'dueDate',
        'objectCode',
        'rsdRate',
    ];
    const items = reduceGroupBy(ppRsdItemsData, fields, 'lines', (p, c) => ({
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

    sinkExchange.mapContext('importedCount', ppRsdItemsData.length);
    sinkExchange.mapContext('failedItems', failedItems);

    const link = ppRsdItemsData.map(_ => ({
        RSD_NUMBER: sinkInput.rsdNumber,
        CONTRACT_NUMBER: _.contractNumber,
        DUE_DATE: _.dueDate,
        OBJECT_CODE: _.objectCode,
        ITEM_NO: _.itemNo,
    }));

    const sat = ppRsdItemsData.map(_ => ({
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
        RSD_AMOUNT_MANUAL: _.rsdAmountManual,
    }));

    return {
        'ACC_IMPL.RSD_ITEM_LINK': link,
        'ACC_IMPL.RSD_ITEM_SAT': sat,
    };
};
