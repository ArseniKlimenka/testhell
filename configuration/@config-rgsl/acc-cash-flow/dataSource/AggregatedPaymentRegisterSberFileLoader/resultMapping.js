const { newGuid, replaceNullWithUndefined, removeExtraSymbols } = require('@config-rgsl/acc-base/lib/excelFileLoaderHelper');

module.exports = function resultMapping(input) {
    input = replaceNullWithUndefined(input);
    const paymentAmount = parseFloat(input.paymentAmount);


    const ret = {
        smallPaymentNumber: removeExtraSymbols(input.smallPaymentNumber),
        paymentDate: input.paymentDate,
        paymentDescription: input.paymentDescription,
        paymentAmount: paymentAmount,
        allocationAmount: paymentAmount,
    };

    return {
        data: ret,
        $recordKey: newGuid()
    };

};
