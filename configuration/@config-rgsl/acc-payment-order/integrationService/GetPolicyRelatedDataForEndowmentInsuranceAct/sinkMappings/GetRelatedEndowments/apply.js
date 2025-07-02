const formatUtils = require('@config-rgsl/infrastructure/lib/FormatUtils');
const printoutUtils = require('@config-rgsl/acc-payment-order/lib/printoutHelper');
const { endowmentPaymentLineType } = require('@config-rgsl/claim-base/lib/claimConsts');

module.exports = function mapping(sinkResult, sinkInput, sinkExchange, additionalDataSourcesResults) {

    const serviceInput = sinkExchange.serviceInput;
    const endowmentRecord = sinkResult.data.find(e => e.metadata.code === serviceInput.endowmentNumber).resultData;
    const currentBenificiary = endowmentRecord.endowmentBeneficiaries.find(b => b.partyCode === serviceInput.recipientPartyCode);
    const percentage = parseFloat(currentBenificiary.amountToPayPercetage);

    const paymentLines = endowmentRecord.paymentLines;
    const surrenderValueLine = paymentLines.find(l => l.lineType === endowmentPaymentLineType.surrenderValue);
    const debtLine = paymentLines.find(l => l.lineType === endowmentPaymentLineType.debt);
    const pitLine = paymentLines.find(l => l.lineType === endowmentPaymentLineType.PIT);
    const investProfitLine = paymentLines.find(l => l.lineType === endowmentPaymentLineType.investProfit);
    const investProfitAnnualLine = paymentLines.find(l => l.lineType === endowmentPaymentLineType.investProfitAnnual);
    const investProfitCouponLine = paymentLines.find(l => l.lineType === endowmentPaymentLineType.investProfitCoupon);
    const dividendsLine = paymentLines.find(l => l.lineType === endowmentPaymentLineType.dividends);
    const investProfitAmountInRub = investProfitLine ? parseFloat(investProfitLine.lineAmountInRubCurrency) : 0;
    const investProfitAnnualAmountInRub = investProfitAnnualLine ? parseFloat(investProfitAnnualLine.lineAmountInRubCurrency) : 0;
    const investProfitCouponAmountInRub = investProfitCouponLine ? parseFloat(investProfitCouponLine.lineAmountInRubCurrency) : 0;
    const dividendsAmountInRub = dividendsLine ? parseFloat(dividendsLine.lineAmountInRubCurrency) : 0;
    const investProfitAmountSum = (investProfitAmountInRub + investProfitAnnualAmountInRub + investProfitCouponAmountInRub + dividendsAmountInRub) * percentage;

    const endowmentData = {
        beneficiaryReason: currentBenificiary.beneficiaryReason.description,
        statementApplicationDate: endowmentRecord.statementApplicationDate ? printoutUtils.formatDatePrint(endowmentRecord.statementApplicationDate) : '',
        realtedEndowments: sinkResult.data.filter(e => e.metadata.code !== serviceInput.endowmentNumber),
        eventType: endowmentRecord.eventType.description,
        eventTypeCode: endowmentRecord.eventType.code,
        eventReason: endowmentRecord.eventReason ? endowmentRecord.eventReason.description : '',
        eventDate: endowmentRecord.eventDate ?? '',
        surrenderValueAmountInRub: formatUtils.formatNumberToMoney((surrenderValueLine ? parseFloat(surrenderValueLine.lineAmountInRubCurrency) : 0) * percentage),
        debtAmountInRub: formatUtils.formatNumberToMoney((debtLine ? parseFloat(debtLine.lineAmountInRubCurrency) : 0) * percentage),
        pitAmountInRub: formatUtils.formatNumberToMoney(pitLine ? parseFloat(pitLine.lineAmountInRubCurrency) : 0 * percentage),
        investProfitAmountInRub: investProfitAmountInRub,
        investProfitAnnualAmountInRub: investProfitAnnualAmountInRub,
        investProfitCouponAmountInRub: investProfitCouponAmountInRub,
        dividendsAmountInRub: dividendsAmountInRub,
        investProfitTotalAmountInRub: formatUtils.formatNumberToMoney(investProfitAmountSum),
        riskCode: endowmentRecord.risk.riskCode,
        beneficiaryPaymentType: getPaymentType(currentBenificiary, serviceInput)
    };

    sinkExchange.endowmentData = endowmentData;

};

function getPaymentType(currentBenificiary, input) {

    const docs = input.nettedDocuments;

    if (!input.hasNetting || docs.length === 0) {

        return currentBenificiary.beneficiaryPaymentType.description;
    }

    if (input.isFullNetting && docs.length === 1) {

        return `Взаимозачёт в счёт оплаты договора ${docs[0].documentNo} в полном размере`;
    }

    const docsMessages = [];

    docs.forEach(item => {

        const message = `в счёт оплаты договора ${item.documentNo} в размере ${item.amount}`;
        docsMessages.push(message);
    });

    let bankPaymentMessage = '';

    if (!input.isFullNetting) {

        bankPaymentMessage = ` и на расчётный счёт ${input.paymentAmount}`;
    }

    return `Взаимозачёт ${docsMessages.join(", ")}${bankPaymentMessage}`;
}
