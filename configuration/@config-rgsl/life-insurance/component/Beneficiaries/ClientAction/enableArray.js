'use strict';

const { changeAmendmentTypes } = require('@config-rgsl/life-insurance/lib/policyChangeAmendmentConsts');
const { isSaveOperationAvailable, shouldDisableSaveableContract, isTermLifeProduct } = require('@config-rgsl/infrastructure/lib/UIUtils');
const { product } = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');
const { getValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');
const lifeInsuranceConstants = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');

module.exports = function enableArray(input, ambientProperties) {

    const amendmentType = input.context.Dimensions.amendmentType;

    const state = input.context.State.Code;
    const contractType = input.context.Dimensions.contractType;

    if (isTermLifeProduct(input) &&
        isSaveOperationAvailable(this.view) &&
        state == lifeInsuranceConstants.quoteState.Draft &&
        contractType == lifeInsuranceConstants.contractType.Quote) {

        return true;
    }

    if ((this.view.areAllElementsDisabled() && !amendmentType) ||
        !isSaveOperationAvailable(this.view) ||
        shouldDisableSaveableContract(input, this.view) ||
        (amendmentType && amendmentType !== changeAmendmentTypes.nonFinancialChange)) {

        return false;
    }

    return true;
};
