'use strict';

const { collectExceptionsByRow } = require('@config-rgsl/life-insurance/lib/excelImportHelper');

module.exports = function apply(sinkResult, sinkInput, sinkExchange) {

    const currentRow = sinkExchange.currentRow;

    if (sinkResult.data.length == 0) {

        collectExceptionsByRow(sinkExchange.exceptionsByRow, `
            Указанный договор страхования не найден.
            Номер договора ${currentRow.contractNumber}.
        `);
    }

    if (sinkExchange.exceptionsByRow.length > 0) {

        throw new Error(`E: Номер строки Excel: ${currentRow.excelRowNumber}.` + sinkExchange.exceptionsByRow.join(', '));
    }

};
