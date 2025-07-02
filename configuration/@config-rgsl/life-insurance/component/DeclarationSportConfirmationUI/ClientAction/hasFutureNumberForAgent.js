const { isSaveOperationAvailable, shouldDisableSaveableContract } = require('@config-rgsl/infrastructure/lib/UIUtils');
const { changeAmendmentTypes, changeTypes } = require('@config-rgsl/life-insurance/lib/policyChangeAmendmentConsts');

module.exports = function hasFutureNumberForAgent(input, ambientProperties) {

    const amendmentType = input.context.Dimensions.amendmentType;

    if (!isSaveOperationAvailable(this.view) ||
    shouldDisableSaveableContract(input, this.view) ||
    (!!amendmentType)) {

        return true;
    }

    return false;
};
