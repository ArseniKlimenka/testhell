'use strict';

module.exports = async function onPaymentLinesManualCorrectionChanged(input, ambientProperties) {

    const existingPaymentOrders = input.rootContext.ClientViewModel.existingPaymentOrders || [];
    const beneficiaries = input.rootContext.Body.endowmentBeneficiaries ?? [];
    const paymentLinesManualCorrection = input.rootContext.Body.endowmentAmounts?.paymentLinesManualCorrection ?? false;

    if (!paymentLinesManualCorrection) {

        beneficiaries.forEach(item => {

            const relatedPaymentOrder = existingPaymentOrders.find(po => po.beneficiaryCode === item.partyCode && po.paymentOrderSubType === 'Endowment');

            if (!relatedPaymentOrder) {

                item.calculateFromAmount = false;
            }
        });
    }

    this.view.rebind();
    this.view.reevaluateRules();
    this.view.validate();
};
