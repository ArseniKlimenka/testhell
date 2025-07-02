module.exports = function resultMapping(input) {

    const output = {};

    output.partnerCode = input.PARTNER_CODE;
    output.productCode = input.PRODUCT_CODE;
    output.limit = input.LIMIT;

    return output;
};
