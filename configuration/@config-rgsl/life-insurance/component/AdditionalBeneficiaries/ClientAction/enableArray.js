'use strict';

const { isSaveOperationAvailable } = require('@config-rgsl/infrastructure/lib/UIUtils');
const { changeAmendmentTypes } = require('@config-rgsl/life-insurance/lib/policyChangeAmendmentConsts');

module.exports = function enableArray(input, ambientProperties) {

    const amendmentType = input.context.Dimensions.amendmentType;

    if ((this.view.areAllElementsDisabled() && !amendmentType) ||
        !isSaveOperationAvailable(this.view) ||
        (amendmentType && amendmentType !== changeAmendmentTypes.nonFinancialChange)) {

        return false;
    }

    return true;
};
