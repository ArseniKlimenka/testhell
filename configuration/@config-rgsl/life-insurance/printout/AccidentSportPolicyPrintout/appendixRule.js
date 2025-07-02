const dateTimeUtils = require('@config-rgsl/infrastructure/lib/DateTimeUtils');
const { newRules, product } = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');

module.exports = function appendixRule(input) {

    const appendix = [];

    const productCode = input.body.mainInsuranceConditions?.insuranceProduct?.productCode;
    const isACCIDPC = productCode === product.ACCIDPC;

    // Памятка по страховому случаю
    if (isACCIDPC) {
        appendix.push({
            name: `AccidentAppendixImageContainer/img/newMemoInsuredEventACCIDPC.pptx`,
            mode: 'Append'
        });
    }

    return appendix;
};
