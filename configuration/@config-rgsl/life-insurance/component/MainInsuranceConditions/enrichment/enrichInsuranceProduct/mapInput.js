module.exports = function mapping(input) {

    const rootData = this.businessContext?.rootData;
    const productCode = rootData.mainInsuranceConditions?.insuranceProduct?.productCode;
    const productDescription = rootData.mainInsuranceConditions?.insuranceProduct?.productDescription;
    const productGroup = rootData.mainInsuranceConditions?.insuranceProduct?.productGroup;
    const salesSegment = rootData.mainInsuranceConditions?.insuranceProduct?.salesSegment;

    if (!productCode || (productDescription && productGroup && salesSegment)) {
        return null;
    }

    const output = {
        data: {
            criteria: {
                code: productCode
            }
        }
    };

    return output;
};
