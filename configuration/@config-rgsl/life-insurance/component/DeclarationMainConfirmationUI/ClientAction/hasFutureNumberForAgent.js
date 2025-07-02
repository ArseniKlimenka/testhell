const { isSaveOperationAvailable, shouldDisableSaveableContract, isTermLifeProduct } = require('@config-rgsl/infrastructure/lib/UIUtils');
const { changeAmendmentTypes, changeTypes } = require('@config-rgsl/life-insurance/lib/policyChangeAmendmentConsts');
const lifeInsuranceConstants = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');

module.exports = function hasFutureNumberForAgent(input, ambientProperties) {

    const amendmentType = input.context.Dimensions.amendmentType;
    const stateCode = input.context.State.Code;
    const contractType = input.context.Dimensions.contractType;

    if (isTermLifeProduct(input) &&
        isSaveOperationAvailable(this.view) &&
        stateCode == lifeInsuranceConstants.quoteState.Draft &&
        contractType == lifeInsuranceConstants.contractType.Quote) {

        return false;
    }

    if (!isSaveOperationAvailable(this.view) ||
    shouldDisableSaveableContract(input, this.view) ||
    (!!amendmentType)) {

        return true;
    }

    return false;
};
