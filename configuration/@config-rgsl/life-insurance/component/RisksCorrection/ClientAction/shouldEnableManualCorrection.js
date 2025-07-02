const { changeAmendmentTypes, changeTypes } = require('@config-rgsl/life-insurance/lib/policyChangeAmendmentConsts');

module.exports = function shouldEnableManualCorrection(input, ambientProperties) {

    const currentWorkUnitActor = ambientProperties.currentWorkUnitActor;
    const currentUserGroups = ambientProperties.applicationContext.currentUser().getUserGroups() || [];
    const isUnderwriting = currentUserGroups.some(item => item.UserGroupCode == 'underwriting');
    const amendmentType = input.context.Dimensions.amendmentType;
    const state = input.context.State.Code;
    const amendmentData = input.context.Body.amendmentData?.finChangeAmendmentData;
    const selectedChangeTypes = amendmentData?.mainAttributes?.changeTypes || [];
    selectedChangeTypes.includes(changeTypes.riskEdit);

    return currentWorkUnitActor == 'Underwriter' && isUnderwriting && amendmentType !== changeAmendmentTypes.financialChange;

};
