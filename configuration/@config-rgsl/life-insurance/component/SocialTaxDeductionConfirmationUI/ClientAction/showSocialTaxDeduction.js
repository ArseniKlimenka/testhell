const lifeInsuranceConstants = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');
const dateTimeUtils = require('@config-rgsl/infrastructure/lib/DateTimeUtils');

module.exports = function showSocialTaxDeduction(input) {

    const productCode = input?.componentContext?.mainInsuranceConditions?.insuranceProduct?.productCode;
    const oldContracts = ((dateTimeUtils.isBeforeOrEqual(input?.rootContext?.Body?.policyTerms?.startDate, "2024-09-30") && ["EBMGVTB", "EBMGVVTB", "EBMGVNVTB"].includes(productCode))
    || (dateTimeUtils.isBeforeOrEqual(input?.rootContext?.Body?.policyTerms?.startDate, "2024-11-04") && ["EBMGNVTB"].includes(productCode))) ?? false; // skip valid for old contracts

    if (lifeInsuranceConstants.productGroupArray.SOCIAL_TAX_DEDUCTION.includes(productCode) && !oldContracts) {
        return true;
    }

    return false;

};
