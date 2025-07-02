'use strict';

const { changeAmendmentTypes, changeTypes } = require('@config-rgsl/life-insurance/lib/policyChangeAmendmentConsts');
const { isSaveOperationAvailable, shouldDisableSaveableContract } = require('@config-rgsl/infrastructure/lib/UIUtils');

module.exports = function enableEquityStrategies(input) {

    const amendmentType = input.context.Dimensions.amendmentType;
    const state = input.context.State.Code;

    if ((this.view.areAllElementsDisabled() && !amendmentType)
        || !isSaveOperationAvailable(this.view)
        || shouldDisableSaveableContract(input, this.view)
        || (amendmentType && amendmentType !== changeAmendmentTypes.nonFinancialChange)) {

        return false;
    }

    const amendmentData = input.context.Body.amendmentData?.nonFinChangeAmendmentData;
    const selectedChangeTypes = amendmentData?.mainAttributes?.changeTypes || [];

    if (amendmentType) {
        if (state === 'Draft' || state === 'OperationsApproval') {
            return selectedChangeTypes.includes(changeTypes.investmentParametersEdit);
        }
        return false;
    }

    return true;

};
