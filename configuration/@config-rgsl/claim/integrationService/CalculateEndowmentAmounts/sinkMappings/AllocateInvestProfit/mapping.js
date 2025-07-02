'use strict';

const { endowmentStates,
    insuredEventReasons,
    investmentProfitTypes,
    endowmentPaymentLineType } = require('@config-rgsl/claim-base/lib/claimConsts');

module.exports = function mapping(input, sinkExchange) {

    if (input.endowmentState !== endowmentStates.operationsApproval) {

        return;
    }

    const body = input.body;
    const eventDate = body.mainAttributes?.applicationInfo?.eventDate;
    const contractNumber = body.mainAttributes?.contract?.number;
    const currentReasonCode = body.mainAttributes.eventReason?.code;
    const currentPaymentLines = body.endowmentAmounts.paymentLines ?? [];
    const hasInvestProfitPaymentLines = currentPaymentLines
        .some(line => line.lineType === endowmentPaymentLineType.investProfit ||
            line.lineType === endowmentPaymentLineType.investProfitAnnual ||
            line.lineType === endowmentPaymentLineType.investProfitCoupon ||
            line.lineType === endowmentPaymentLineType.dividends);

    if (!eventDate || !contractNumber || !currentReasonCode || !hasInvestProfitPaymentLines) {

        sinkExchange.shouldCancelAllocations = true;
        return;
    }

    let investmentProfitTypeCodes = [];

    switch (currentReasonCode) {
        case insuredEventReasons.annualOrCoupon.code:
            investmentProfitTypeCodes = [investmentProfitTypes.investProfit.code, investmentProfitTypes.investProfitAnnual.code];
            break;
        case insuredEventReasons.contractEnd.code:
            investmentProfitTypeCodes = [investmentProfitTypes.investProfit.code, investmentProfitTypes.investProfitCoupon.code];
            break;
        case insuredEventReasons.nonGuaranteedCoupon.code:
            investmentProfitTypeCodes = [investmentProfitTypes.investProfitCoupon.code, investmentProfitTypes.dividends.code];
            break;
        default:
            break;
    }

    if (investmentProfitTypeCodes.length === 0) {

        sinkExchange.shouldCancelAllocations = true;
        return;
    }

    return {
        request: {
            ReferenceNumber: input.endowmentNumber,
            ReferenceConfName: "Endowment",
            EventDate: eventDate,
            ContractNumber: contractNumber,
            PaymentTypes: investmentProfitTypeCodes
        }
    };
};
