'use strict';

const dateTimeUtils = require('@config-rgsl/infrastructure/lib/DateTimeUtils');
const {
    newRules,
    product
} = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');
const printoutsConstant = require("@config-rgsl/life-insurance/lib/printoutsConstant");

module.exports = function mapping(input) {

    const issueDate = input.body.basicConditions?.issueDate;
    const isOldMemo = dateTimeUtils.isBefore(issueDate, newRules.WCENOAS.startDate);
    const productCode = input.body.mainInsuranceConditions?.insuranceProduct?.productCode;
    const isWCEN3OAS = productCode === product.WCEN3OAS;

    return {
        title: printoutsConstant.printoutMemoName.MemoInsuredEventWCENOASPrintout,
        isOldMemo,
        isWCEN3OAS
    };
};
