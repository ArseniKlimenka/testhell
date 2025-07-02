'use strict';

const DateTimeUtils = require('@config-rgsl/infrastructure/lib/DateTimeUtils');
const { round } = require('@config-system/infrastructure/lib/RoundingUtils');

module.exports = function strategyConfigurationResponseMapping(input) {

    let output = [];
    const data = input.response?.data ?? [];

    if (data.length > 0) {

        output = data.map((element) => {

            const resultData = element.resultData;
            const issueDateFrom = resultData.issueDateFrom ? DateTimeUtils.formatDate(resultData.issueDateFrom, DateTimeUtils.DateFormats.CALENDAR) : '';
            const issueDateTo = resultData.issueDateTo ? DateTimeUtils.formatDate(resultData.issueDateTo, DateTimeUtils.DateFormats.CALENDAR) : '';
            const optionPriceRounded = round(resultData.optionPrice * 100, 2);
            const optionPrice = resultData.optionPrice ? `Цена опциона: ${optionPriceRounded};` : '';
            const fixRate = resultData.fixRate ? ` Ставка купона: ${resultData.fixRate};` : '';
            const participationCoeffRounded = round(resultData.participationCoeff * 100, 2);
            const participationCoeff = resultData.participationCoeff ? ` КУ: ${participationCoeffRounded};` : '';
            const displayText = `${optionPrice}${fixRate}${participationCoeff}`.trim();

            return {
                value: {
                    issueDateFrom: resultData.issueDateFrom,
                    issueDateTo: resultData.issueDateTo,
                    optionPrice: optionPriceRounded,
                    fixRate: resultData.fixRate,
                    participationCoeff: participationCoeffRounded,
                    currencyCode: resultData.currencyCode,
                    intialShare: resultData.intialShare
                },
                displayName: `${displayText} (${issueDateFrom} - ${issueDateTo})`
            };
        });
    }

    return output;
};
