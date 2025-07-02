'use strict';

const { collectExceptionsByRow } = require('@config-rgsl/life-insurance/lib/excelImportHelper');

module.exports = function apply(sinkResult, sinkInput, sinkExchange) {

    const currentRow = sinkExchange.currentRow;

    if (sinkResult.data.length == 0) {

        collectExceptionsByRow(sinkExchange.exceptionsByRow, `
            Указанный перестраховщик не найден.
            Код перестраховщика ${currentRow.reinsurerCode}.`
        );

    }

};
