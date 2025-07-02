'use strict';

const sourceFileFormatInsuranceRulesDataConstants = [
    {
        "fileFormat": 1,
        "formatName": "Excel",
        "dataSourceName": "InsuranceRulesXlsxFileLoaderDataSource"
    }
];

function changeRuleCode(ruleCode, productCode, creditProgramId) {
    if (ruleCode && productCode && creditProgramId && productCode == 'CACB' && ruleCode == 'CL_9_20230401') {
        if (creditProgramId != 'РЖ08' && creditProgramId != 'РЖ36') {
            ruleCode = 'CL_12_20230401';
        }
    }
}

module.exports = {
    changeRuleCode,
    sourceFileFormatInsuranceRulesDataConstants
};
