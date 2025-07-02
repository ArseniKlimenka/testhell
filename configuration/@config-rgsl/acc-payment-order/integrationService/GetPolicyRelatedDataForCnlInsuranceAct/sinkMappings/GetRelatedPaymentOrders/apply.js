const printoutUtils = require('@config-rgsl/acc-payment-order/lib/printoutHelper');

module.exports = function mapping(sinkResult, sinkInput, sinkExchange, additionalDataSourcesResults) {

    if (sinkResult?.data?.length > 0) {

        const currencyList = sinkExchange.currencyList ?? [];
        const realtedEndowments = sinkExchange.realtedEndowments?.filter(e => e.resultData.eventReason.code == '301' || e.resultData.eventReason.code == '701') ?? [];
        let message = '';

        sinkResult.data.forEach(order => {

            const endowment = realtedEndowments.find(e => e.metadata.code === order.resultData.referenceNumber);

            if (endowment) {

                const endowmentMessage = getPreviousPaymentsString(order, currencyList);
                message += endowmentMessage;
            }
        });

        sinkExchange.previousPayments = message;
    }
};

function getPreviousPaymentsString(order, currencyList) {

    const actNo = order.resultData?.insuranceAct?.actNumber;
    const actDate = order.resultData?.insuranceAct?.actDate;
    const formatedActDate = actDate ? printoutUtils.formatDatePrint(actDate) : '';

    const currency = order.resultData.paymentCurrencyCode;
    const currencyInfo = currencyList.find(item => item.currencyCode === currency);
    let currencyDescription = currencyInfo.currencyDesc;
    const codeIndex = currencyDescription.indexOf(currencyInfo.currencyCode);

    if (codeIndex === -1) {

        currencyDescription = `${currencyDescription} (${currencyInfo.currencyCode})`;
    }

    return `<span>СТРАХОВОЙ АКТ № ${actNo} от ${formatedActDate}г., выплата в размере ${order.resultData.totalPaymentAmount} ${currencyDescription};</span><br>`;
}

