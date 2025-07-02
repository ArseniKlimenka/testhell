const { isSaveOperationAvailable } = require('@config-rgsl/infrastructure/lib/UIUtils');

module.exports = function enablePaymentPeriodLastDate(input, ambientProperties) {

    const manualCorrection = input.componentContext?.manualCorrection ?? false;

    return manualCorrection && isSaveOperationAvailable(this.view);
};
