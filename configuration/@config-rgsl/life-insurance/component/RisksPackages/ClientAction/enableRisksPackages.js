'use strict';

const { changeAmendmentTypes, changeTypes } = require('@config-rgsl/life-insurance/lib/policyChangeAmendmentConsts');
const { isSaveOperationAvailable } = require('@config-rgsl/infrastructure/lib/UIUtils');

module.exports = function enableRisksPackages(input) {

    const amendmentType = input.context.Dimensions.amendmentType;
    const state = input.context.State.Code;

    if ((this.view.areAllElementsDisabled() && !amendmentType)
        || !isSaveOperationAvailable(this.view)
        || (amendmentType && amendmentType !== changeAmendmentTypes.financialChange)) {

        return false;
    }

    const amendmentData = input.context.Body.amendmentData?.finChangeAmendmentData;
    const selectedChangeTypes = amendmentData?.mainAttributes?.changeTypes || [];

    if (amendmentType) {

        if (state === 'Draft' || state === 'OperationsApproval') {

            return selectedChangeTypes.includes(changeTypes.riskEdit);
        }

        return false;

    }

    return true;
};
