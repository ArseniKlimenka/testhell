'use strict';

const { changeAmendmentTypes, changeTypes } = require('@config-rgsl/life-insurance/lib/policyChangeAmendmentConsts');
const { isSaveOperationAvailable } = require('@config-rgsl/infrastructure/lib/UIUtils');

module.exports = function enableSurrenderValuesTable(input) {

    const amendmentType = input.context.Dimensions.amendmentType;
    const state = input.context.State.Code;

    if ((this.view.areAllElementsDisabled() && !amendmentType)
        || !isSaveOperationAvailable(this.view)
        || (amendmentType && amendmentType !== changeAmendmentTypes.financialChange)
        || !['Draft', 'OperationsApproval'].includes(state)) {

        return false;
    }

    return true;
};
