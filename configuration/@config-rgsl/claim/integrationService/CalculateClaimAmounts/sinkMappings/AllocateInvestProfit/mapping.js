'use strict';

const { claimStates,
    investmentProfitTypes,
    claimPaymentLineType } = require('@config-rgsl/claim-base/lib/claimConsts');

module.exports = function mapping(input, sinkExchange) {

    if (input.claimState !== claimStates.claimManagerApproval) {

        return;
    }

    const body = input.body;
    const eventDate = body.mainAttributes?.insuredEvent?.insuredEventDate;
    const contractNumber = body.mainAttributes?.contract?.number;
    const currentPaymentLines = body.claimAmounts.paymentLines ?? [];
    const hasInvestProfitPaymentLines = currentPaymentLines
        .some(line => line.lineType === claimPaymentLineType.invProfitSlp);

    if (!eventDate || !contractNumber || !hasInvestProfitPaymentLines) {

        sinkExchange.shouldCancelAllocations = true;
        return;
    }

    return {
        request: {
            ReferenceNumber: input.claimNumber,
            ReferenceConfName: "Claim",
            EventDate: eventDate,
            ContractNumber: contractNumber,
            PaymentTypes: [investmentProfitTypes.slp.code]
        }
    };
};
