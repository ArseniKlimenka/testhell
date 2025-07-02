const { getValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');

module.exports = function mapping(sinkResult, sinkInput, sinkExchange, additionalDataSourcesResults) {

    if (sinkResult?.data?.length > 0) {

        const realtedClaims = sinkExchange.relatedClaims ?? [];
        let message = '';
        const currencyList = sinkExchange.currencyList;

        sinkResult.data.forEach(order => {

            const claim = realtedClaims.find(claim => claim.metadata.code === order.resultData.referenceNumber);

            if (claim) {

                const claimMessage = getPreviousPaymentsString(claim, order, currencyList);
                message += claimMessage;
            }
        });

        sinkExchange.previousPayments = message;
    }
};

function getPreviousPaymentsString(claim, order, currencyList) {

    const actNo = order?.resultData?.insuranceAct?.actNumber;
    const actDate = order?.resultData?.insuranceAct?.actDate;

    const currency = claim.resultData.contractCurrency;
    const currencyInfo = currencyList.find(item => item.currencyCode === currency);
    let currencyDescription = currencyInfo.currencyDesc;
    const codeIndex = currencyDescription.indexOf(currencyInfo.currencyCode);

    if (codeIndex === -1) {

        currencyDescription = `${currencyDescription} (${currencyInfo.currencyCode})`;
    }

    return `<p>СТРАХОВОЙ АКТ № ${actNo} от ${actDate}г. (Убыток № ${claim.metadata.code}), риск "${claim.resultData.risk.riskShortDescription}", выплата в размере ${order.resultData.totalPaymentAmount} ${currencyDescription};</p><br>`;
}
