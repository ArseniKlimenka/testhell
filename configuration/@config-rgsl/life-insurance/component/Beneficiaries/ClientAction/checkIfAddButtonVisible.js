'use strict';

const { isSaveOperationAvailable } = require('@config-rgsl/infrastructure/lib/UIUtils');
const { changeAmendmentTypes, changeTypes } = require('@config-rgsl/life-insurance/lib/policyChangeAmendmentConsts');

module.exports = function checkIfAddButtonVisible(input, ambientProperties) {

    const amendmentType = input.context.Dimensions.amendmentType;
    const state = input.context.State.Code;

    if ((this.view.areAllElementsDisabled() && !amendmentType)
        || !isSaveOperationAvailable(this.view)
        || (amendmentType && amendmentType !== changeAmendmentTypes.nonFinancialChange)) {

        return false;
    }

    const amendmentData = input.context.Body.amendmentData?.nonFinChangeAmendmentData;
    const selectedChangeTypes = amendmentData?.mainAttributes?.changeTypes || [];

    if (amendmentType) {

        if (state === 'OperationsApproval') {

            return selectedChangeTypes.includes(changeTypes.beneficiarySelection);
        }


        return false;

    }

    return true;
};
