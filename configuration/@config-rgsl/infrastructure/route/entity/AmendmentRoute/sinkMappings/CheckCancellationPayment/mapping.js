"use strict";

const { amendmentPaymentLineType, cancellationAmendmentState } = require('@config-rgsl/life-insurance/lib/amendmentConstants');
const amendmentUtils = require('@config-rgsl/life-insurance/lib/amendmentUtils');

module.exports = function mapping({
    id,
    number,
    state,
    body,
    commonBody,
    originalDocumentNumber,
    sequenceNumber,
    versionState,
    dimensions
}) {

    if (state !== cancellationAmendmentState.SentToPayment) {

        return;
    }

    const paymentLines = body.paymentAmendmentConditions.paymentLines;
    const pitAmount = paymentLines.find(l => l.paymentLineType === amendmentPaymentLineType.pit)?.paymentLineSumInRub ?? 0;
    const recipients = body.paymentAmendmentConditions.canellationRecipients;
    let hasNotPaidPOs = false;
    let hasPaidPOs = false;
    const distributedAmount = recipients.reduce((i, j) => i + j.amountToPayInRubCurrency, 0);
    const paymentAmount = amendmentUtils.calculateTotalCancellationAmount(body).totalInRub;
    const isAmountFullyDistributed = distributedAmount === paymentAmount;

    recipients.forEach(item => {

        if (!item.isPaid) {

            hasNotPaidPOs = true;
        }
        else {

            hasPaidPOs = true;
        }
    });

    let transitionName = undefined;

    if (hasPaidPOs && !hasNotPaidPOs && isAmountFullyDistributed) {

        transitionName = 'SentToPayment_to_Paid';
    }

    if (transitionName) {

        return {
            contractNo: number,
            transitionName: transitionName,
        };
    }
};
