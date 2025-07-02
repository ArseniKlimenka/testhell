'use strict';

const { reduceGroupBy, compareByObjectProperties } = require('@config-rgsl/infrastructure/lib/ArrayUtilsImpl');

module.exports = function apply(sinkResult, sinkInput, sinkExchange) {

    if (sinkResult.data.length === 0) {
        return;
    }

    const postingData = sinkResult.data.map(_ => _.resultData);

    const groupedPostingData = reduceGroupBy(postingData, [
        'contractNumber',
        'mainContractNumber',
        'maxPPLoadDate',
        'newPostedUntilDate',
        'postingDate',
        'polcyStartDate',
        'amendmentValidFrom',
        'currencyCode',
    ], 'lines', (p, c) => {
        return {
            amount: p.amount + c.amount,
        };
    }, { amount: 0 }
    );

    const invoices = [];
    for (const groupedPostingDataItem of groupedPostingData) {
        const invoice = {
            invoiceNumber: groupedPostingDataItem.contractNumber + ':' + groupedPostingDataItem.postingDate,
            maxPPLoadDate: groupedPostingDataItem.maxPPLoadDate,
            newPostedUntilDate: groupedPostingDataItem.newPostedUntilDate,
            contractNumber: groupedPostingDataItem.contractNumber,
            mainContractNumber: groupedPostingDataItem.mainContractNumber,
            postingDate: groupedPostingDataItem.postingDate,
            polcyStartDate: groupedPostingDataItem.polcyStartDate,
            amendmentValidFrom: groupedPostingDataItem.amendmentValidFrom,
            currencyCode: groupedPostingDataItem.currencyCode,
            lines: groupedPostingDataItem.lines,
            sortField: (groupedPostingDataItem.amount < 0 ? -1 : 1) * new Date(groupedPostingDataItem.postingDate),
        };
        invoice.lines.sort(compareByObjectProperties(['itemNo']));
        invoices.push(invoice);
    }

    invoices.sort(compareByObjectProperties(['contractNumber', 'sortField']));

    sinkExchange.mapContext('invoices', invoices);
};
