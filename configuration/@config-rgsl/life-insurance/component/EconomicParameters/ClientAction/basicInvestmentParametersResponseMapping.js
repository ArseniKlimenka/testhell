'use strict';

const DateTimeUtils = require('@config-rgsl/infrastructure/lib/DateTimeUtils');

module.exports = function basicInvestmentParametersResponseMapping(input) {

    let output = [];
    const data = input.response?.data ?? [];

    if (data.length > 0) {

        output = data.map((element) => {

            const resultData = element.resultData;
            const issueDateFrom = resultData.issueDateFrom ? DateTimeUtils.formatDate(resultData.issueDateFrom, DateTimeUtils.DateFormats.CALENDAR) : '';
            const issueDateTo = resultData.issueDateTo ? DateTimeUtils.formatDate(resultData.issueDateTo, DateTimeUtils.DateFormats.CALENDAR) : '';
            const strategyCode = resultData.strategyCode ? resultData.strategyCode : '';
            const strategyDescriptionFull = resultData.strategyDescriptionFull ? resultData.strategyDescriptionFull : '';

            return {
                value: {
                    strategyDescription: resultData.strategyDescriptionFull,
                    strategyCode: resultData.strategyCode,
                    issueDateFrom: resultData.issueDateFrom,
                    issueDateTo: resultData.issueDateTo,
                    currencyCode: resultData.currencyCode,
                },
                displayName: `${strategyDescriptionFull} (${strategyCode})`
            };
        });
    }

    return output;
};
