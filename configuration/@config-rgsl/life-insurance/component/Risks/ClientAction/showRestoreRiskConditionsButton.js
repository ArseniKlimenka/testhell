const { getValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');
const { isSaveOperationAvailable } = require('@config-rgsl/infrastructure/lib/UIUtils');
const { checkAvailabilitySome } = require('@config-rgsl/infrastructure/lib/ArrayUtilsImpl');

module.exports = function showRestoreRiskConditionsButton(input, ambientProperties) {

    const isSavaible = isSaveOperationAvailable(this.view);
    const stateCode = getValue(input, 'context.State.Code');
    const currentWorkUnitActor = ambientProperties.currentWorkUnitActor;
    const isHardcoreDeletedRisk = getValue(input, 'rootContext.Body.mainInsuranceConditions.isHardcoreDeletedRisk', false);
    const canBeDeleted = ['DVV36404', 'DAVV36404', 'I42204', 'DNS42204', 'DTP42204', 'D42204'];
    const deletedRisks = input.context.Body.mainInsuranceConditions.deletedRisks ?? [];
    const isRisksDeleted = checkAvailabilitySome(deletedRisks, canBeDeleted);

    return isSavaible && stateCode == 'OnReview' && currentWorkUnitActor == 'Underwriter' && (isHardcoreDeletedRisk || isRisksDeleted);
};
