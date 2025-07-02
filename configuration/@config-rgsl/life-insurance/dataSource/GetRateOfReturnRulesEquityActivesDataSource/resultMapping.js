'use strict';

const {
    arrayAttributesArr,
    objectAttributesArr,
    objectWrongAttributesArr
} = require('@config-rgsl/life-insurance/lib/rateOfReturnRulesEquityActivesHelper');
const {
    parseJSONconfig
} = require('@config-rgsl/life-insurance/lib/excelImportHelper');

module.exports = function resultMapping(input) {

    const output = {};

    output.excelRowNumber = input.EXCEL_ROW_NUMBER;
    output.productCode = input.PRODUCT_CODE;
    output.insuranceTerms = input.INSURANCE_TERMS;
    output.issueDateFrom = input.ISSUE_DATE_FROM;
    output.issueDateTo = input.ISSUE_DATE_TO;
    output.issueDateStr = input.ISSUE_DATE_STR;
    output.manualRate = input.MANUAL_RATE;
    output.investmentFrequency = input.INVESTMENT_FREQUENCY;
    output.mf = input.MF;
    output.costsOpenContracts = input.COSTS_OPEN_CONTRACTS;
    output.commWithdrawalFunds = input.COMM_WITHDRAWAL_FUNDS;
    output.rko = input.RKO;
    output.isStandardContractConditions = input.IS_STANDARD_CONTRACT_CONDITIONS;
    output.isCoordinationUDRequired = input.IS_COORDINATION_UD_REQUIRED;
    output.importDocumentId = input.IMPORT_DOCUMENT_ID;
    output.version = input.CONF_VERSION;
    output.loadedBy = input.LOADED_BY;
    output.loadDate = input.LOAD_DATE;

    const attributesToParse = [...objectAttributesArr, ...objectWrongAttributesArr, ...arrayAttributesArr];
    parseJSONconfig(output, attributesToParse);

    return output;
};
