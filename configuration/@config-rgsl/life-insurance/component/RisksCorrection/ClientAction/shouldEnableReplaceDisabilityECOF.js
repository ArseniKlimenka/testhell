const { changeAmendmentTypes, changeTypes } = require('@config-rgsl/life-insurance/lib/policyChangeAmendmentConsts');
const { product } = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');

module.exports = function shouldEnableReplaceDisabilityECOF(input, ambientProperties) {

    const currentWorkUnitActor = ambientProperties.currentWorkUnitActor;
    const currentUserGroups = ambientProperties.applicationContext.currentUser().getUserGroups() || [];
    const isUnderwriting = currentUserGroups.some(item => item.UserGroupCode == 'underwriting');
    const amendmentType = input.context.Dimensions.amendmentType;
    const productCode = input.context.Body?.mainInsuranceConditions?.insuranceProduct?.productCode;

    return currentWorkUnitActor == 'Underwriter'
        && isUnderwriting
        && amendmentType !== changeAmendmentTypes.financialChange
        && [product.ECOFPVTB, product.ECOFVVTB, product.ECOF2ZENIT].includes(productCode);
};
