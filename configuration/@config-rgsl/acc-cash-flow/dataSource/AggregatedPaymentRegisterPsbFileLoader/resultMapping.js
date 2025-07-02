const { currency } = require('@config-rgsl/infrastructure/lib/ImplConstants');
const { newGuid, replaceNullWithUndefined, getContractDuration, convertStringDateFormat } = require('@config-rgsl/acc-base/lib/excelFileLoaderHelper');

module.exports = function resultMapping(input) {
    input = replaceNullWithUndefined(input);

    const ret = {
        smallPaymentNumber: input.smallPaymentNumber,
        paymentDate: convertStringDateFormat(input.paymentDate),
        payerFullName: input.payerFullName,
        paymentDescription: input.paymentDescription,
        contractBeginDate: convertStringDateFormat(input.contractBeginDate),
        productName: input.productName,
        paymentAmount: parseFloat(input.paymentAmount),
        allocationAmount: parseFloat(input.paymentAmount),
        currencyCode: input.currencyCode.toUpperCase() === "RUR" ? currency.localCurrency : input.currencyCode,
        contractDuration: getContractDuration(input.contractDuration),
        additionalInformation: input.additionalInformation,
        segment: input.segment,
    };

    return {
        data: ret,
        $recordKey: newGuid()
    };

};
