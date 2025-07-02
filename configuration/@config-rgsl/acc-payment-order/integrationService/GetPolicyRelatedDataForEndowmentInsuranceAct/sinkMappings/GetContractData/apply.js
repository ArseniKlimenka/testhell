const printoutUtils = require('@config-rgsl/acc-payment-order/lib/printoutHelper');

module.exports = function apply(sinkResult, sinkInput, sinkExchange, additionalDataSourcesResults) {

    if (sinkResult?.data?.length === 0) {

        return;
    }

    const contractRecord = sinkResult.data[0].resultData;
    const contractCurrency = contractRecord.currencyCode;
    const currencyList = sinkExchange.currencyList ?? [];

    const contractCurrencyInfo = currencyList.find(item => item.currencyCode === contractCurrency);
    let currencyDescription = contractCurrencyInfo.currencyDesc;
    const codeIndex = currencyDescription.indexOf(contractCurrencyInfo.currencyCode);

    if (codeIndex === -1) {

        currencyDescription = `${currencyDescription} (${contractCurrencyInfo.currencyCode})`;
    }

    const contractData = {
        contractIssueDate: contractRecord.issueDate,
        contractIssueDateFormated: contractRecord.startDate ? printoutUtils.formatDatePrint(contractRecord.issueDate) : '',
        contractType: contractRecord.productGroupDescription,
        contractCurrency: contractCurrency,
        holderFullName: contractRecord.parties.holder.fullName,
        insuredFullName: contractRecord.parties.insuredPerson.fullName,
        contractCurrencyDescription: currencyDescription
    };

    sinkExchange.contractData = contractData;
};
