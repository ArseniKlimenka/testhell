const { getValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');
const { changeAmendmentTypes, changeTypes } = require('@config-rgsl/life-insurance/lib/policyChangeAmendmentConsts');
const lifeInsuranceConstants = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');

module.exports = function shouldEnableReplaceDisabilityAnyReason(input, ambientProperties) {

    const currentWorkUnitActor = ambientProperties.currentWorkUnitActor;
    const currentUserGroups = ambientProperties.applicationContext.currentUser().getUserGroups() || [];
    const isUnderwriting = currentUserGroups.some(item => item.UserGroupCode == 'underwriting');
    const amendmentType = input.context.Dimensions.amendmentType;

    const productCode = input?.context?.Body?.mainInsuranceConditions?.insuranceProduct?.productCode;

    return currentWorkUnitActor == 'Underwriter'
        && isUnderwriting
        && amendmentType !== changeAmendmentTypes.financialChange
        && lifeInsuranceConstants.productGroupArray.PRODUCT_FOR_DISABILITY_ANY_REASON.includes(productCode);
};
