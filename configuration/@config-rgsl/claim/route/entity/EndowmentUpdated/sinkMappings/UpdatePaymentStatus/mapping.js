'use static';

const { endowmentStates, endowmentTransitions, endowmentPaymentLineType } = require('@config-rgsl/claim-base/lib/claimConsts');
const { calculateTotalEndowmentAmount } = require('@config-rgsl/claim-base/lib/claimGeneralHelper');

module.exports = function mapping({
    id,
    number,
    state,
    body,
    commonBody,
    originalDocument
}, sinkExchange) {

    const paymentLines = body.endowmentAmounts.paymentLines ?? [];
    const pitAmount = paymentLines.find(l => l.lineType === endowmentPaymentLineType.PIT)?.lineAmountInContractCurrency ?? 0;
    const beneficiaries = body.endowmentBeneficiaries ?? [];
    let hasNotPaidPOs = false;
    let hasPaidPOs = false;
    const distributedAmount = beneficiaries.reduce((i, j) => i + j.amountToPay, 0);
    const paymentAmount = calculateTotalEndowmentAmount(body).amountInContractCurrency - pitAmount;
    const isAmountFullyDistributed = distributedAmount === paymentAmount;

    beneficiaries.forEach(item => {

        if (!item.isPaid) {

            hasNotPaidPOs = true;
        }
        else {

            hasPaidPOs = true;
        }
    });

    let transitionName = undefined;

    if (state === endowmentStates.sentToPayment) {

        if (hasPaidPOs && (hasNotPaidPOs || !isAmountFullyDistributed)) {

            transitionName = endowmentTransitions.sentToPaymentToPartiallyPaid;
        }
        else if (hasPaidPOs && !hasNotPaidPOs && isAmountFullyDistributed) {

            transitionName = endowmentTransitions.sentToPaymentToPaid;
        }
    }
    else if (state === endowmentStates.partiallyPaid && !hasNotPaidPOs && isAmountFullyDistributed) {

        transitionName = endowmentTransitions.partiallyPaidToPaid;
    }

    if (transitionName) {

        return {
            businessNumber: number,
            transition: {
                transitionName: transitionName,
                configurationName: 'Endowment',
                configurationVersion: '1'
            }
        };
    }
};
