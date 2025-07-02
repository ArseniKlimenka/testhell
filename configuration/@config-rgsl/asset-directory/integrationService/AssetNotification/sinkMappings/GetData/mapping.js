const dateUtils = require('@config-system/infrastructure/lib/DateUtilsCore');

module.exports = function mapping(input, sinkExchange) {
    const reportDate = input.reportDate ?? dateUtils.todayAsString();

    return {
        input: {
            data: {
                criteria: {
                    reportDate: reportDate
                }
            }
        }
    };
};
