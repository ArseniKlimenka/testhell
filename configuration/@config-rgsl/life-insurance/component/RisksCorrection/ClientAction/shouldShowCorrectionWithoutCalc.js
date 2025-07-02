const { changeAmendmentTypes } = require('@config-rgsl/life-insurance/lib/policyChangeAmendmentConsts');
const { product } = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');

module.exports = function shouldShowCorrectionWithoutCalc(input, ambientProperties) {

    const currentUserRoles = ambientProperties.applicationContext.currentUser().getUserRoles() || [];
    const isBackOffice = currentUserRoles.some(item => item.ApplicationRoleCodeName == 'GeneralBackOffice');
    const amendmentType = input.context.Dimensions.amendmentType;
    const isECOF = [product.ECOFPVTB, product.ECOFVVTB, product.ECOF2ZENIT].includes(input.context?.Body?.mainInsuranceConditions?.insuranceProduct?.productCode);

    return isECOF && isBackOffice || amendmentType === changeAmendmentTypes.financialChange;
};
