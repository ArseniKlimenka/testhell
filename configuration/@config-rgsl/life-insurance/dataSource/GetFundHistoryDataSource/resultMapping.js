'use strict';

const DateTimeUtils = require('@config-rgsl/infrastructure/lib/DateTimeUtils');

module.exports = function resultMapping(input) {

    const output = {};

    const assets = input.ASSETS ? JSON.parse(input.ASSETS) : [];

    output.excelRowNumber = input.EXCEL_ROW_NUMBER;
    output.rowNumber = input.ROW_NUMBER;
    output.documentNumber = input.DOCUMENT_NUMBER;
    output.fundStatus = input.FUND_STATUS;
    output.netAssetsAmount = input.NET_ASSETS_AMOUNT;
    output.freeMoney = input.FREE_MONEY;
    output.numberOfUnits = input.NUMBER_OF_UNITS;
    output.unitCurrentAmount = input.UNIT_CURRENT_AMOUNT;
    output.reportDate = DateTimeUtils.formatDate(input.REPORT_DATE, DateTimeUtils.DateFormats.ECMASCRIPT);
    output.reportDateVersion = input.REPORT_DATE_VERSION;
    output.importDocumentId = input.IMPORT_DOCUMENT_ID;
    output.confVersion = input.CONF_VERSION;
    output.loadedBy = input.LOADED_BY;
    output.loadDate = input.LOAD_DATE;

    output.assets = assets;

    return output;
};
