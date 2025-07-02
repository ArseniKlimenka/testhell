const { isSaveOperationAvailable, shouldDisableSaveableContract } = require('@config-rgsl/infrastructure/lib/UIUtils');
const { policyState, actor } = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');

module.exports = function enableIssueForm(input, ambientProperties) {

    if (ambientProperties.configurationCodeName == 'CollectiveLifeInsurancePolicy')
    { return false; }

    const currentActor = input.rootContext.WorkUnitActor.CurrentActor;
    const currentState = input.rootContext.State.Code;
    const contractType = input.rootContext.Dimensions.contractType;

    const productCode = input.context.Body?.mainInsuranceConditions?.insuranceProduct?.productCode;
    const issueDate = input.context.Body?.basicConditions?.issueDate;

    if (!isSaveOperationAvailable(this.view) ||
        shouldDisableSaveableContract(input, this.view) ||
        this.view.areAllElementsDisabled() ||
        (contractType === 'Policy' && currentActor !== actor.Operations && currentState !== policyState.Draft) ||
        !(productCode && issueDate)) {

        return false;
    }

    return true;
};
