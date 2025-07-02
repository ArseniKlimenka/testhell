'use strict';

const printoutsConstant = require("@config-rgsl/life-insurance/lib/printoutsConstant");
const printoutsHelper = require("@config-rgsl/life-insurance/lib/printoutsHelper");

module.exports = function mapping(input) {

    const productCode = input.body.mainInsuranceConditions.insuranceProduct.productCode;
    const issueDate = input.body.basicConditions.issueDate;
    const taxDeductionAfter28022025 = printoutsHelper.checkTaxDeductionConditions(issueDate, productCode);
    let titleMemo = printoutsConstant.printoutMemoName.TAX1Printout;
    if (taxDeductionAfter28022025) {
        titleMemo = printoutsConstant.printoutMemoName.TAX1Printout28_02_2025;
    }

    return {
        title: titleMemo,
        taxDeductionAfter28022025: taxDeductionAfter28022025
    };
};
