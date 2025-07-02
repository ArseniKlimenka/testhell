module.exports = function (input, sinkExchange) {
    return {
        data: {
            // this will be the input to the datasource of the data export
            exportReportGuid: input.exportReportGuid
        },
        formatterName: "ExportExcelReportBankStatementItem"
    };
};
