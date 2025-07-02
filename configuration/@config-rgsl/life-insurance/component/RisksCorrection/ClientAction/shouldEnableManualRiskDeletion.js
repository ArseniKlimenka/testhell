const { getValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');
const { changeAmendmentTypes, changeTypes } = require('@config-rgsl/life-insurance/lib/policyChangeAmendmentConsts');
const { product, productGroupArray } = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');

module.exports = function shouldEnableManualRiskDeletion(input, ambientProperties) {

    const currentWorkUnitActor = ambientProperties.currentWorkUnitActor;
    const currentUserGroups = ambientProperties.applicationContext.currentUser().getUserGroups() || [];
    const isUnderwriting = currentUserGroups.some(item => item.UserGroupCode == 'underwriting');
    const amendmentType = input.context.Dimensions.amendmentType;

    const productCode = input?.context?.Body?.mainInsuranceConditions?.insuranceProduct?.productCode;

    return currentWorkUnitActor == 'Underwriter'
        && isUnderwriting
        && amendmentType !== changeAmendmentTypes.financialChange
        && productGroupArray.SHOW_MANUAL_RISK_DELETION.includes(productCode);
};
