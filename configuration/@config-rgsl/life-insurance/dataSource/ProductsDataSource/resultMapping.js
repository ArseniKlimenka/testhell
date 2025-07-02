module.exports = function resultMapping(input) {

    const output = {};

    output.productCode = input.CODE;
    output.productGroup = input.PRODUCT_GROUP;
    output.productDescription = input.DESCRIPTION;
    output.salesSegment = input.SALES_SEGMENT;

    return output;

};
