'use strict';

const { changeAmendmentTypes, changeTypes } = require('@config-rgsl/life-insurance/lib/policyChangeAmendmentConsts');
const { isSaveOperationAvailable } = require('@config-rgsl/infrastructure/lib/UIUtils');

module.exports = function enableRisksTable(input) {

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

            const isMigrated = input.context.Body.migrationAttributes?.isMigrated ?? false;
            return selectedChangeTypes.includes(changeTypes.riskEdit) || selectedChangeTypes.includes(changeTypes.insuredSumAndPaymentEdit) || isMigrated;
        }


        return false;

    }

    return true;
};
