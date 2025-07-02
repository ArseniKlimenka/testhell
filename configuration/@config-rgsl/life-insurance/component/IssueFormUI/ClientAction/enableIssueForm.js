const { getValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');
const { isSaveOperationAvailable, shouldDisableSaveableContract } = require('@config-rgsl/infrastructure/lib/UIUtils');
const { changeAmendmentTypes, changeTypes } = require('@config-rgsl/life-insurance/lib/policyChangeAmendmentConsts');
const { policyState, actor } = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');

module.exports = function enableIssueForm(input) {

    const currentActor = input.rootContext.WorkUnitActor.CurrentActor;
    const currentState = input.rootContext.State.Code;
    const contractType = input.rootContext.Dimensions.contractType;

    if (!isSaveOperationAvailable(this.view) ||
        shouldDisableSaveableContract(input, this.view) ||
        this.view.areAllElementsDisabled() ||
        (contractType === 'Policy' && currentActor !== actor.Operations && currentState !== policyState.Draft)) {

        return false;
    }

    return true;
};
