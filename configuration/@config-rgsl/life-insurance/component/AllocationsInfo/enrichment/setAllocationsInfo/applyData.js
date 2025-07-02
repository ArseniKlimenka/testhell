const { round } = require('@config-system/infrastructure/lib/RoundingUtils');
const amendmentConstants = require('@config-rgsl/life-insurance/lib/amendmentConstants');

module.exports = function applyData(input, dataSourceResponse) {

    const body = this.businessContext.rootData;
    const allocationsInfo = dataSourceResponse && dataSourceResponse.data && dataSourceResponse.data.map(item => item.resultData) || [];
    body.allocationsInfo = allocationsInfo;

    // to calc on creation cooloff cancellation by credit import
    const amendmentSubType = body?.basicAmendmentConditions?.amendmentSubType;
    const amendmentReason = body?.basicAmendmentConditions?.amendmentReason;
    const paymentLines = body?.paymentAmendmentConditions?.paymentLines || [];
    const paymentRefundSum = allocationsInfo.length > 0 && round(allocationsInfo.reduce((acc, elem) => acc += elem.payAmount, 0), 2) || 0;
    const canellationRecipients = body?.paymentAmendmentConditions?.canellationRecipients || [];

    if (paymentLines.length == 0 &&
        canellationRecipients.length == 1 &&
        amendmentSubType == amendmentConstants.amendmentSubType.byClientDecision &&
        amendmentReason == amendmentConstants.amendmentReason.byClientCoolOff) {

        if (paymentRefundSum > 0) {
            paymentLines.push({
                paymentLineType: 'paymentRefund',
                paymentLineSum: paymentRefundSum,
                paymentLineSumInRub: paymentRefundSum,
                paymentLineSumByRisks: [],
                weight: 3
            });
            canellationRecipients[0].amountToPay = paymentRefundSum;
            canellationRecipients[0].amountToPay = paymentRefundSum;
        }
        else {
            body.paymentAmendmentConditions.canellationRecipients = [];
        }

    }

};
