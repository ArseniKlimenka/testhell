const printoutUtils = require('@config-rgsl/acc-payment-order/lib/printoutHelper');

module.exports = function apply(sinkResult, sinkInput, sinkExchange, additionalDataSourcesResults) {

    if (sinkResult?.data?.length === 0) {

        return;
    }

    const contractRecord = sinkResult.data[0].resultData;
    const currencyList = sinkExchange.currencyList ?? [];
    const contractCurrency = contractRecord.currencyCode;
    const contractCurrencyInfo = currencyList.find(item => item.currencyCode === contractCurrency);
    let currencyDescription = contractCurrencyInfo.currencyDesc;
    const codeIndex = currencyDescription.indexOf(contractCurrencyInfo.currencyCode);

    if (codeIndex === -1) {

        currencyDescription = `${currencyDescription} (${contractCurrencyInfo.currencyCode})`;
    }

    const contractData = {
        contractIssueDateFormated: contractRecord.issueDate ? printoutUtils.formatDatePrint(contractRecord.issueDate) : '',
        contractStartDateFormated: contractRecord.startDate ? printoutUtils.formatDatePrint(contractRecord.startDate) : '',
        contractType: contractRecord.productGroupDescription,
        holderFullName: contractRecord.parties.holder.fullName,
        insuredFullName: contractRecord.parties.insuredPerson.fullName,
        contractCurrency: contractCurrency,
        contractCurrencyDescription: currencyDescription
    };

    sinkExchange.contractData = contractData;
};
