'use strict';
const amendmentConstants = require('@config-rgsl/life-insurance/lib/amendmentConstants');

module.exports = function onIsTaxDeductionClaimedChanged(input) {

    const isClaimed = input.rowContext.isClaimed;

    if (isClaimed === amendmentConstants.isTaxDeductionClaimedValues.no) {

        input.rowContext.amount = amendmentConstants.taxDeductionAmounts.min;
    }
    else if (isClaimed === amendmentConstants.isTaxDeductionClaimedValues.noInfo) {

        input.rowContext.amount = input.rowContext.yearPaymentsAmount < amendmentConstants.taxDeductionAmounts.max ? input.rowContext.yearPaymentsAmount : amendmentConstants.taxDeductionAmounts.max;
    }
    else if (isClaimed === amendmentConstants.isTaxDeductionClaimedValues.thirdParty) {

        input.rowContext.amount = 0;
    }
    else {

        input.rowContext.amount = undefined;
    }

    this.view.rebind();
    this.view.reevaluateRules();
    this.view.validate();
};
