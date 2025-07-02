"use strict";

module.exports = function mapping(sinkResult, sinkInput, sinkExchange, additionalDataSourcesResults) {

    if (sinkResult?.data?.length === 0) {

        return;
    }

    const amendmentRecord = sinkResult.data[0].resultData;
    const currencyList = sinkExchange.currencyList ?? [];
    const paymentLines = amendmentRecord.body.paymentAmendmentConditions?.paymentLines ?? [];
    const surrenderValue = paymentLines.find(paymentLine => paymentLine.paymentLineType == 'surrenderValue')?.paymentLineSumInRub;
    const investProfit = paymentLines.find(paymentLine => paymentLine.paymentLineType == 'investProfit')?.paymentLineSumInRub;
    const pitAmountInRub = paymentLines.find(paymentLine => paymentLine.paymentLineType == 'PIT')?.paymentLineSumInRub;
    const debt = paymentLines.find(paymentLine => paymentLine.paymentLineType == 'debt')?.paymentLineSumInRub;
    const canellationRecipients = amendmentRecord.body.paymentAmendmentConditions?.canellationRecipients ?? [];

    const amendmentData = {
        surrenderValue: surrenderValue,
        investProfit: investProfit,
        pitAmountInRub: pitAmountInRub,
        debt: debt,
        canellationRecipients: canellationRecipients
    };

    sinkExchange.amendmentData = amendmentData;
};
