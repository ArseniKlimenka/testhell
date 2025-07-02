const { LocalDateTime } = require('@js-joda/core');

module.exports = function (input, sinkExchange) {
    const bsiIds = sinkExchange.resolveContext("bankStatementItemIds");
    const logData = [];

    bsiIds.forEach(i => {
        logData.push({
            EXPORT_REPORT_GUID: input.exportReportGuid,
            CREATED_DATE: LocalDateTime.now().toString(),
            BANK_STATEMENT_ITEM_ID: i,
        });
    });

    return {
        "ACC_IMPL.EXPORT_REPORT_LOG": logData,
    };
};
