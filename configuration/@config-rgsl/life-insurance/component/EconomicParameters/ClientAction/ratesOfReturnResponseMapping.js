'use strict';

const DateTimeUtils = require('@config-rgsl/infrastructure/lib/DateTimeUtils');

module.exports = function ratesOfReturnResponseMapping(input) {

    let output = [];
    const data = input.response?.data ?? [];

    if (data.length > 0) {

        const dataToCompare = data.filter(i => i.resultData.rateOfReturn && !i.resultData.variant);

        output = dataToCompare.map((element) => {

            const resultData = element.resultData;
            const issueDateFrom = resultData.issueDateFrom ? DateTimeUtils.formatDate(resultData.issueDateFrom, DateTimeUtils.DateFormats.CALENDAR) : '';
            const issueDateTo = resultData.issueDateTo ? DateTimeUtils.formatDate(resultData.issueDateTo, DateTimeUtils.DateFormats.CALENDAR) : '';
            const rateOfReturn = resultData.rateOfReturn ? `Значение ставки: ${resultData.rateOfReturn};` : '';
            const manualRate = resultData.manualRate ? ` Ставка КВ: ${resultData.manualRate};` : '';
            const displayText = `${rateOfReturn}${manualRate}`.trim();

            return {
                value: {
                    strategyCode: resultData.strategyCode,
                    issueDateFrom: resultData.issueDateFrom,
                    issueDateTo: resultData.issueDateTo,
                    rateOfReturn: resultData.rateOfReturn,
                    manualRate: resultData.manualRate,
                    guaranteedIncome: resultData.guaranteedIncome,
                    insuranceTerms: resultData.insuranceTerms,
                    currencyCode: resultData.currencyCode,
                },
                displayName: `${displayText} (${issueDateFrom} - ${issueDateTo})`
            };
        });
    }

    return output;
};
