'use strict';

const amendmentConstants = require('@config-rgsl/life-insurance/lib/amendmentConstants');

module.exports = function mapping(input, sinkExchange) {

    if (input.amendmentState !== amendmentConstants.cancellationAmendmentState.OperationsApproval) {

        return;
    }

    const body = input.body;
    const amendmentSubType = body.basicAmendmentConditions.amendmentSubType;
    const subTypesToSkipInvestProfit = [
        amendmentConstants.amendmentSubType.byCompanyDecision,
        amendmentConstants.amendmentSubType.byCourtDecision,
        amendmentConstants.amendmentSubType.byCommissionDecision
    ];

    if (subTypesToSkipInvestProfit.includes(amendmentSubType)) {

        sinkExchange.shouldCancelAllocations = true;
        return;
    }

    const eventDate = input.body.basicAmendmentConditions.validFrom;
    const contractNumber = input.contractNumber;
    const amednmentReason = body.basicAmendmentConditions.amendmentReason;
    const currentPaymentLines = body.paymentAmendmentConditions.paymentLines ?? [];
    const hasInvestProfitPaymentLine = currentPaymentLines.some(line => line.paymentLineType === amendmentConstants.amendmentPaymentLineType.investProfit);

    if (!eventDate || !contractNumber || !amednmentReason || !amendmentSubType || !hasInvestProfitPaymentLine) {

        sinkExchange.shouldCancelAllocations = true;
        return;
    }

    return {
        request: {
            ReferenceNumber: input.amendmentNumber,
            ReferenceConfName: input.amendmentConfName,
            EventDate: eventDate,
            ContractNumber: contractNumber,
            PaymentTypes: [amendmentConstants.investmentProfitTypes.investProfit.code]
        }
    };
};
