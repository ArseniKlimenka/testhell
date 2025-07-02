module.exports = function showBasicAssetProperties(input, ambientProperties) {

    const body = input.context?.Body;
    const productCode = body?.mainInsuranceConditions?.insuranceProduct?.productCode;

    return productCode && input.context?.Body?.productConfiguration?.isProductLinkedToAsset;
};
