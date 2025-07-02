'use strict';

module.exports = function enableAmountOfPremiumsPaid(input, ambientProperties) {

    const documentStateCode = input.context.State?.Code;

    const isIssuedOrCancelled = documentStateCode == 'Issued' || documentStateCode == 'Cancelled';
    const isManualCorrectionSum = input.componentContext.isManualCorrectionSum;

    return isManualCorrectionSum && !isIssuedOrCancelled;
};
