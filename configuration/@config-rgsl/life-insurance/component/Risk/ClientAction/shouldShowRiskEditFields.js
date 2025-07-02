const { changeAmendmentTypes, changeTypes } = require('@config-rgsl/life-insurance/lib/policyChangeAmendmentConsts');

module.exports = function shouldShowRiskEditFields(input, ambientProperties) {

    const currentWorkUnitActor = ambientProperties.currentWorkUnitActor;
    const amendmentType = input.rootContext.Dimensions.amendmentType;
    const amendmentData = input.rootContext.Body.amendmentData?.finChangeAmendmentData;
    const selectedChangeTypes = amendmentData?.mainAttributes?.changeTypes || [];

    return currentWorkUnitActor == 'Underwriter' ||
        (amendmentType === changeAmendmentTypes.financialChange &&
            (selectedChangeTypes.includes(changeTypes.riskEdit) || selectedChangeTypes.includes(changeTypes.insuredSumAndPaymentEdit)));
};
