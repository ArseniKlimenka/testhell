const printoutsHelper = require("@config-rgsl/life-insurance/lib/printoutsHelper");
const { productGroupArray } = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');
const dateUtils = require('@config-rgsl/infrastructure/lib/DateTimeUtils');

module.exports = function mapping(input) {
    const { policy } = printoutsHelper.getPollicyInfo(input, this);
    let holder = printoutsHelper.getPerson(input.body.policyHolder.partyData);
    holder = printoutsHelper.getPersonData(holder, input.body.policyHolder.partyData);
    holder = printoutsHelper.getEpolicyInfo(holder, input.body.issueForm);
    const { body } = printoutsHelper.getPrintoutCommonData(input, this);
    const productCode = body.mainInsuranceConditions.insuranceProduct.productCode;
    const issueDate = body?.basicConditions?.issueDate;

    const isDocumentActive = this.businessContext.documentState == 'Active';
    const isIDGZENIT = productGroupArray.IDG_ZENIT.includes(productCode);
    const isAfter02072025 = dateUtils.isAfterOrEqual(issueDate, '2025-02-07');

    return {
        policy,
        holder,
        isDocumentActive,
        isIDGZENIT,
        isAfter02072025
    };

};
