const { isSaveOperationAvailable, shouldDisableSaveableContract } = require('@config-rgsl/infrastructure/lib/UIUtils');
const { quoteState, policyState, actor } = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');

module.exports = function isEvaluationContractEnabled(input, ambientProperties) {

    const currentActor = input.rootContext.WorkUnitActor.CurrentActor;
    const currentState = input.rootContext.State.Code;
    const contractType = input.rootContext.Dimensions.contractType;

    return !this.view.areAllElementsDisabled() &&
    isSaveOperationAvailable(this.view) &&
    (contractType === 'Quote' && currentState === quoteState.Draft && currentActor === actor.Operations);
};
