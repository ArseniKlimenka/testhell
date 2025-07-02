'use strict';

module.exports = function resultMapping(input) {

    const output = {};

    output.excelRowNumber = input.EXCEL_ROW_NUMBER;
    output.ruleNumber = input.RULE_NUMBER;
    output.ruleCode = input.RULE_CODE;
    output.ruleDescription = input.RULE_DESCRIPTION;
    output.ruleDate = input.RULE_DATE;
    output.ruleLink = input.RULE_LINK;
    output.version = input.CONF_VERSION;
    output.loadedBy = input.LOADED_BY;
    output.loadDate = input.LOAD_DATE;

    return output;
};
