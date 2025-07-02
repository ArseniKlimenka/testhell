'use strict';

const lifeInsuranceConstants = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');
const dateTimeUtils = require('@config-rgsl/infrastructure/lib/DateTimeUtils');

/**
* @errorCode {errorCode} needChooseSocialTax
* @errorCode {errorCode} needChooseSingleSocialTaxWay
*/

module.exports = function validateSocialTaxDeductionEdit(input, ambientProperties) {

    const validationErrors = [];

    const productCode = this.businessContext.rootData.mainInsuranceConditions?.insuranceProduct?.productCode;
    const isSTD = lifeInsuranceConstants.productGroupArray.SOCIAL_TAX_DEDUCTION.includes(productCode);
    const oldContracts = ((dateTimeUtils.isBeforeOrEqual(this.businessContext?.rootData?.policyTerms?.startDate, "2024-09-30") && ["EBMGVTB", "EBMGVVTB", "EBMGVNVTB"].includes(productCode))
    || (dateTimeUtils.isBeforeOrEqual(this.businessContext?.rootData?.policyTerms?.startDate, "2024-11-04") && ["EBMGNVTB"].includes(productCode))) ?? false; // skip valid for old contracts

    if (!input.isAgree && !input.isDenied && !input.isUndecided && isSTD && !oldContracts) {
        validationErrors.push({
            errorCode: "needChooseSocialTax",
            errorDataPath: '/socialTaxDeduction'
        });
    }

    if (((input.isAgree && input.isDenied && input.isUndecided)
        || (input.isAgree && input.isDenied)
        || (input.isAgree && input.isUndecided)
        || (input.isDenied && input.isUndecided))
        && isSTD) {
        validationErrors.push({
            errorCode: "needChooseSingleSocialTaxWay",
            errorDataPath: '/socialTaxDeduction'
        });
    }

    return validationErrors;

};
