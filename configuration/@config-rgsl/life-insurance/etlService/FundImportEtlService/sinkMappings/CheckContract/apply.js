'use strict';

const { translationUtils } = require('@adinsure/runtime');

module.exports = function apply(sinkResult, sinkInput, sinkExchange, additionalDataSourcesResults) {

    const currentRow = sinkExchange.currentRow;

    if (sinkResult.data.length == 0) {

        throw new Error(`E: Договор с указанным номером должен присутствовать в системе.
        Номер строки Excel: ${currentRow.excelRowNumber}. Номер договора ${currentRow.documentNumber}.`);
    }

    if (sinkResult.data.length > 0) {

        const contractData = sinkResult.data[0]?.resultData;
        const confName = contractData?.confName;
        const confNameDesc = translationUtils.getTranslation(`document/${confName}/1`, 'rootConfiguration', 'Title', confName);
        const configurationsAllowToImport = additionalDataSourcesResults?.GetFundAllowImportDataSource?.data?.map(i => i.resultData.code) ?? [];

        if (!configurationsAllowToImport.includes(confName)) {

            throw new Error(`E: Номер строки Excel: ${currentRow.excelRowNumber}.
            Договор с кодом конфигурации "${confNameDesc}" не разрешён для импорта. Номер договора ${currentRow.documentNumber}.`);
        }

        const allowedFundStatuses = additionalDataSourcesResults?.GetFundStatusDataSource?.data?.map(i => i.resultData.description) ?? [];

        const fundStatus = currentRow?.fundStatus;

        if (!allowedFundStatuses.includes(fundStatus)) {

            throw new Error(`E: Номер строки Excel: ${currentRow.excelRowNumber}.
            Статус фонда ${fundStatus} не найден в справочнике значений. Доступные статусы фондов ${allowedFundStatuses.join("; ")}.`);
        }

        sinkExchange.contractId = contractData.id;
    }
};
