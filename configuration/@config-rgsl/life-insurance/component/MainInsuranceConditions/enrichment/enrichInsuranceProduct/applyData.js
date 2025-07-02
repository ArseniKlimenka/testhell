module.exports = function mapping(input, dataSourceResponse) {

    const resultData = dataSourceResponse.data[0]?.resultData;
    const productCode = resultData?.productCode;
    const productGroup = resultData?.productGroup;
    const productDescription = resultData?.productDescription;
    const salesSegment = resultData?.salesSegment;

    input.insuranceProduct = {
        productCode,
        productGroup,
        productDescription,
        salesSegment
    };

};
