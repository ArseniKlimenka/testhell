'use strict';

module.exports = function showPaymentPeriodLastDate(input, ambientProperties) {

    const productConfiguration = input.additionalContext?.productConfiguration;
    if (!productConfiguration) {
        return false;
    }
    const isReinvestAvailable = productConfiguration?.isReinvestAvailable ?? false;

    const manualCorrection = input.componentContext.manualCorrection ?? false;

    return manualCorrection && !isReinvestAvailable;
};
