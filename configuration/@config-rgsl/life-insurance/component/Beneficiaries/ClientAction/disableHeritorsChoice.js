const lifeInsuranceConstants = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');
const { changeAmendmentTypes, changeTypes } = require('@config-rgsl/life-insurance/lib/policyChangeAmendmentConsts');
const { isSaveOperationAvailable, shouldDisableSaveableContract, isTermLifeProduct } = require('@config-rgsl/infrastructure/lib/UIUtils');

module.exports = function disableHeritorsChoice(input) {

    const amendmentType = input.context.Dimensions.amendmentType;
    const state = input.context.State.Code;
    const contractType = input.context.Dimensions.contractType;

    if (isTermLifeProduct(input) &&
        isSaveOperationAvailable(this.view) &&
        state == lifeInsuranceConstants.quoteState.Draft &&
        contractType == lifeInsuranceConstants.contractType.Quote) {

        return false;
    }

    if ((this.view.areAllElementsDisabled() && !amendmentType) ||
    !isSaveOperationAvailable(this.view) ||
    shouldDisableSaveableContract(input, this.view) ||
    (amendmentType && amendmentType !== changeAmendmentTypes.nonFinancialChange)) {

        return true;
    }

    const amendmentData = input.context.Body.amendmentData?.nonFinChangeAmendmentData;
    const selectedChangeTypes = amendmentData?.mainAttributes?.changeTypes || [];

    if (amendmentType) {

        if (state === 'OperationsApproval') {

            return !selectedChangeTypes.includes(changeTypes.beneficiarySelection);
        }


        return true;

    }

    const configurationCodeName = input.context.ConfigurationCodeName;
    const typesToDisable = [lifeInsuranceConstants.productCode.CreditLifeInsuranceQuote, lifeInsuranceConstants.productCode.CreditLifeInsurancePolicy];

    if (typesToDisable.includes(configurationCodeName)) {

        return true;
    }

    return false;
};
