const { getValue } = require("@config-rgsl/infrastructure/lib/ObjectUtils");
const { changeTypes } = require('@config-rgsl/life-insurance/lib/policyChangeAmendmentConsts');

module.exports = function enableEndDate(input, ambientProperties) {

    const withTarification = getValue(input, 'context.Body.basicConditions.withTarification', false);
    const isCollectivePolicy = ambientProperties.configurationCodeName == 'CollectiveLifeInsurancePolicy';
    const isColleciveWithoutTarification = isCollectivePolicy && !withTarification;
    const state = input.context.State.Code;
    const amendmentData = input.context.Body.amendmentData?.finChangeAmendmentData;
    const selectedChangeTypes = amendmentData?.mainAttributes?.changeTypes || [];
    const isMigrated = input.context.Body.migrationAttributes?.isMigrated ?? false;
    const isEditableByAmendment = selectedChangeTypes.includes(changeTypes.insuranceTermEdit) && (state === 'Draft' || state === 'OperationsApproval') && isMigrated;

    return isColleciveWithoutTarification || isEditableByAmendment;
};
