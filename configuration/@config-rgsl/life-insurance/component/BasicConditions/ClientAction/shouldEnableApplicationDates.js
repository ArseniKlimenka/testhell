'use strict';

const { changeAmendmentTypes, changeTypes } = require('@config-rgsl/life-insurance/lib/policyChangeAmendmentConsts');
const { isSaveOperationAvailable, shouldDisableSaveableContract, isTermLifeProduct } = require('@config-rgsl/infrastructure/lib/UIUtils');
const { getValue, setValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');
const dateTimeUtils = require('@config-rgsl/infrastructure/lib/DateTimeUtils');
const { product } = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');
const lifeInsuranceConstants = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');

module.exports = function shouldEnableApplicationDates(input, ambientProperties) {

    const state = input.context.State.Code;
    const contractType = input.context.Dimensions.contractType;

    if (isTermLifeProduct(input) &&
        isSaveOperationAvailable(this.view) &&
        state == lifeInsuranceConstants.quoteState.Draft &&
        contractType == lifeInsuranceConstants.contractType.Quote) {

        return true;
    }

    if (this.view.areAllElementsDisabled()
        || !isSaveOperationAvailable(this.view)
        || shouldDisableSaveableContract(input, this.view)) {

        return false;
    }

    return true;
};
