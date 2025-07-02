'use strict';

const { LocalDateTime } = require('@js-joda/core');

module.exports = function mapping(lineInput, sinkExchange) {

    if (sinkExchange.globalContext?.counters?.errorCount > 0) {
        return;
    }

    const lineData = lineInput.data;
    const nextVersion = sinkExchange.maxVersion + 1;

    const recordStatus = {
        EXCEL_ROW_NUMBER: lineData.excelRowNumber,
        RULE_NUMBER: lineData.ruleNumber,
        RULE_CODE: lineData.ruleCode,
        RULE_DESCRIPTION : lineData.ruleDescription,
        RULE_DATE : lineData.ruleDate,
        RULE_LINK : lineData.ruleLink,
        IMPORT_DOCUMENT_ID: lineInput.importDocumentId,
        CONF_VERSION: nextVersion,
        LOADED_BY: this.applicationContext.originatingUser.username,
        LOAD_DATE: LocalDateTime.now().toString()
    };

    return {
        'BFX_IMPL.INSURANCE_RULES': [recordStatus]
    };

};
