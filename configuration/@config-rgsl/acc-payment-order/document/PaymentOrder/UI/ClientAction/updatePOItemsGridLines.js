'use strict';

const { paymentOrderSubType, paymentLineType } = require('@config-rgsl/acc-payment-order/lib/paymentOrderInternalConst');

module.exports = function updatePOItemsGridLines(input) {

    const body = input.context.Body;
    let lines = body.paymentOrderItems;
    const subtype = body.paymentOrderInformation.paymentOrderSubType;

    if (subtype !== paymentOrderSubType.CancellationPIT) {

        lines = lines.filter(line => line.itemType !== paymentLineType.PIT);
    }

    const linesAmount = lines.reduce((sum, item) => sum + item.paymentOrderCurrencyAmount, 0);
    body.paymentOrderAmounts.totalPaymentAmount = linesAmount;
    body.paymentOrderAmounts.paymentAmountInDocCurrency = linesAmount;
    body.paymentOrderAmounts.originalTotalAmount = linesAmount;

    this.view.rebind();
    this.view.reevaluateRules();
    this.view.validate();
};
