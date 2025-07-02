const { changeAmendmentTypes, changeTypes } = require('@config-rgsl/life-insurance/lib/policyChangeAmendmentConsts');

module.exports = function enableEditRiskPeriodsSum(input, ambientProperties) {

    const stateCode = input.rootContext?.State?.Code;
    const amendmentType = input.rootContext.Dimensions.amendmentType;
    const isDraftFinChange = amendmentType === changeAmendmentTypes.financialChange && (stateCode === 'Draft' || stateCode === 'OperationsApproval');

    return isDraftFinChange;
};
