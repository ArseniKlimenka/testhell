'use static';

const { claimStates, transitionNames } = require('@config-rgsl/claim-base/lib/claimConsts');
const { claimRisks } = require('@config-rgsl/claim-base/lib/ClaimRisks');
const { calculateTotalEndowmentAmount, calculateTotalClaimAmount } = require('@config-rgsl/claim-base/lib/claimGeneralHelper');

module.exports = function mapping({
    id,
    number,
    state,
    body,
    commonBody,
    originalDocument
}, sinkExchange) {

    const beneficiaries = body.claimBeneficiaries;
    let hasNotPaidPOs = false;
    let hasPaidPOs = false;
    const distributedAmount = beneficiaries.reduce((i, j) => i + j.amountToPay, 0);
    const paymentAmount = calculateTotalClaimAmount(body).amountInContractCurrency;
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
    const riskCode = body.mainAttributes?.selectedRisk?.riskCode ?? '';
    const riskConf = claimRisks( { riskCode }) ?? {};

    if (state === claimStates.sentToPayment) {

        if (hasPaidPOs && (hasNotPaidPOs || !isAmountFullyDistributed)) {

            if (riskConf?.isOUSVRisk) {

                transitionName = transitionNames.sentToPaymentToOusv;
            }
            else {

                transitionName = transitionNames.sentToPaymentToPartiallyPaid;
            }

        }
        else if (hasPaidPOs && !hasNotPaidPOs && isAmountFullyDistributed) {

            transitionName = transitionNames.sentToPaymentToPaid;
        }
    }
    else if (state === claimStates.partiallyPaid && !hasNotPaidPOs && isAmountFullyDistributed) {

        transitionName = transitionNames.partiallyPaidToPaid;
    }
    else if (state === claimStates.ousv && !hasNotPaidPOs && isAmountFullyDistributed) {

        transitionName = transitionNames.ousvToPaid;
    }

    if (transitionName) {

        return {
            businessNumber: number,
            transition: {
                transitionName: transitionName,
                configurationName: 'Claim',
                configurationVersion: '1'
            }
        };
    }
};
