const amendmentConstants = require('@config-rgsl/life-insurance/lib/amendmentConstants');

module.exports = function paymentLinesIfRowActionIsAllowed(input, ambientProperties) {

    const paymentLinesManualCorrection = input.componentContext.paymentLinesManualCorrection ?? false;
    const paymentLineType = input.affectedRow?.paymentLineType;

    let isEditAvailable;

    if (paymentLineType == amendmentConstants.amendmentPaymentLineType.paymentRefund ||
        paymentLineType == amendmentConstants.amendmentPaymentLineType.pit ||
        paymentLineType == amendmentConstants.amendmentPaymentLineType.investProfit) {

        isEditAvailable = false;
    }
    else {
        isEditAvailable = paymentLinesManualCorrection;
    }

    return {
        delete: false,
        edit: isEditAvailable
    };

};
