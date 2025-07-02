module.exports = function resultMapping(input) {

    const output = {};

    output.contractNumber = input.CONTRACT_NUMBER;
    output.originalConfigurationCodeName = input.CODE_NAME;
    output.originalConfigurationVersion = input.PUBLISHED_VERSION;
    output.issueDate = input.ISSUE_DATE;
    output.productCode = input.PRODUCT_CODE;

    return output;
};
