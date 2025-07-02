
const amendmentUtils = require('@config-rgsl/life-insurance/lib/amendmentUtils');
const amendmentConstants = require('@config-rgsl/life-insurance/lib/amendmentConstants');

module.exports = async function onPaymentLinesManualCorrectionChanged(input, ambientProperties) {

    const existingPaymentOrders = input.rootContext.ClientViewModel.existingPaymentOrders ?? [];
    const recipients = input.componentContext.canellationRecipients ?? [];
    const paymentLinesManualCorrection = input.componentContext?.paymentLinesManualCorrection ?? false;

    if (!paymentLinesManualCorrection) {

        recipients.forEach(item => {

            const relatedPaymentOrder = existingPaymentOrders.find(po => po.recipientCode === item.partyCode &&
                !po.paymentOrderSubType &&
                po.paymentOrderNumber === item.assignedPaymentOrderNumber);

            if (!relatedPaymentOrder) {

                item.calculateFromAmount = false;
            }
        });
    }

    this.view.rebind();
    this.view.reevaluateRules();
    this.view.validate();
};
