'use strict';

const { newGuid, replaceNullWithUndefined } = require('@config-rgsl/acc-base/lib/excelFileLoaderHelper');
const { Exception } = require('handlebars');

module.exports = function resultMapping(input) {

    input = replaceNullWithUndefined(input);

    const currentRowNumber = input.$rowNumber;
    const currentContractNumber = input.contractNumber;
    const investmentProfitRate = Number((parseFloat(input.investmentProfitRate)).toFixed(2));
    const investmentProfitPaymentTypeCode = parseInt(input.investmentProfitPaymentTypeCode);

    const data = {
        excelRowNumber: input.$rowNumber,
        contractNumber: input.contractNumber,
        investmentProfitCalculationDate: input.investmentProfitCalculationDate,
        investmentProfitRate: input.investmentProfitRate ? investmentProfitRate : undefined,
        investmentProfitPaymentTypeCode: input.investmentProfitPaymentTypeCode ? investmentProfitPaymentTypeCode : undefined
    };

    if (typeof investmentProfitRate != 'number' || isNaN(investmentProfitRate)) {
        throw new Exception(`Договор ${currentContractNumber}. Строка ${currentRowNumber}. Размер ДИД ${input.investmentProfitRate} должен иметь числовой формат.`);
    }

    if (typeof investmentProfitPaymentTypeCode != 'number' || isNaN(investmentProfitPaymentTypeCode)) {
        throw new Exception(`Договор ${currentContractNumber}. Строка ${currentRowNumber}. Код типа выплаты ${input.investmentProfitPaymentTypeCode} должен иметь числовой формат.`);
    }

    return {
        data: data,
        $recordKey: newGuid(),
    };
};
