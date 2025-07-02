module.exports = function resultMapping(input) {

    const output = {};

    output.endowmentPaymentVariantCode = input.CODE;
    output.endowmentPaymentVariantDescription = input.DESCRIPTION;

    return output;

};
