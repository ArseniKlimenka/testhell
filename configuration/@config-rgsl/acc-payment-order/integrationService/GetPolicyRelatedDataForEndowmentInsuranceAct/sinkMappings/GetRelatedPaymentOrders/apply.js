const printoutUtils = require('@config-rgsl/acc-payment-order/lib/printoutHelper');

module.exports = function mapping(sinkResult, sinkInput, sinkExchange, additionalDataSourcesResults) {

    if (sinkResult?.data?.length > 0) {

        const realtedEndowments = sinkExchange.endowmentData.realtedEndowments ?? [];
        let message = '';
        const currencyList = sinkExchange.currencyList;

        sinkResult.data.forEach(order => {

            const endowment = realtedEndowments.find(e => e.metadata.code === order.resultData.referenceNumber);

            if (endowment) {

                const endowmentMessage = getPreviousPaymentsString(endowment, order, currencyList);
                message += endowmentMessage;
            }
        });

        sinkExchange.previousPayments = message;
    }
};

function getPreviousPaymentsString(endowment, order, currencyList) {

    const actNo = order?.resultData?.insuranceAct?.actNumber;
    const actDate = order?.resultData?.insuranceAct?.actDate;
    const formatedActDate = actDate ? printoutUtils.formatDatePrint(actDate) : '';

    const currency = endowment.resultData.contractCurrency;
    const currencyInfo = currencyList.find(item => item.currencyCode === currency);
    let currencyDescription = currencyInfo.currencyDesc;
    const codeIndex = currencyDescription.indexOf(currencyInfo.currencyCode);

    if (codeIndex === -1) {

        currencyDescription = `${currencyDescription} (${currencyInfo.currencyCode})`;
    }

    return `<span>СТРАХОВОЙ АКТ № ${actNo} от ${formatedActDate}г., выплата в размере ${order.resultData.totalPaymentAmount} ${currencyDescription};</span><br>`;
}


