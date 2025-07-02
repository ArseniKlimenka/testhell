'use strict';

const DateTimeUtils = require('@config-rgsl/infrastructure/lib/DateTimeUtils');

module.exports = function resultMapping(input) {

    const output = {};

    output.excelRowNumber = input.EXCEL_ROW_NUMBER;
    output.ruleNumber = input.RULE_NUMBER;
    output.ruleDescription = input.RULE_DESCRIPTION;
    output.ruleDate = DateTimeUtils.formatDate(input.RULE_DATE, DateTimeUtils.DateFormats.ECMASCRIPT);
    output.ruleLink = input.RULE_LINK;
    output.importDocumentId = input.IMPORT_DOCUMENT_ID;
    output.version = input.CONF_VERSION;
    output.loadedBy = input.LOADED_BY;
    output.loadDate = input.LOAD_DATE;

    return output;
};
