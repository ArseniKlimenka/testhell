'use strict';

module.exports = function updateGridLines(input, ambientProperties) {

    const body = input.context.Body;

    const nettedAmount = body.paymentOrderNetting.nettedDocuments.reduce((sum, doc) => sum + doc.nettedAmount, 0);
    body.paymentOrderNetting.totalNettingAmount = nettedAmount;

    const totalNettingAmount = input.context.Body.paymentOrderNetting.totalNettingAmount;
    const originalTotalAmount = input.context.Body.paymentOrderAmounts.originalTotalAmount;
    input.context.Body.paymentOrderAmounts.totalPaymentAmount = originalTotalAmount - totalNettingAmount;

    this.view.rebind();
    this.view.reevaluateRules();
    this.view.validate();
};
