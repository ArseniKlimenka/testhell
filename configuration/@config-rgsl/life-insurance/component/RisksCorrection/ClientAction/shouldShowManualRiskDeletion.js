const { changeAmendmentTypes } = require('@config-rgsl/life-insurance/lib/policyChangeAmendmentConsts');
const { product, productGroupArray } = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');

module.exports = function shouldShowManualRiskDeletion(input, ambientProperties) {

    const currentUserRoles = ambientProperties.applicationContext.currentUser().getUserRoles() || [];
    const isBackOffice = currentUserRoles.some(item => item.ApplicationRoleCodeName == 'GeneralBackOffice');
    const amendmentType = input.context.Dimensions.amendmentType;
    const productCode = input?.context?.Body?.mainInsuranceConditions?.insuranceProduct?.productCode;

    return productGroupArray.SHOW_MANUAL_RISK_DELETION.includes(productCode) && (isBackOffice || amendmentType === changeAmendmentTypes.financialChange);
};
