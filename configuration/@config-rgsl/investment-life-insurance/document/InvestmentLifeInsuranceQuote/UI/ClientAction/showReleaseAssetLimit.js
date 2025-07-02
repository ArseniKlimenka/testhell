const { isSaveOperationAvailable } = require('@config-rgsl/infrastructure/lib/UIUtils');

module.exports = function showReleaseAssetLimit(input, ambientProperties) {

    const body = input.context?.Body;
    const productCode = body?.mainInsuranceConditions?.insuranceProduct?.productCode;
    const isProductLinkedToAsset = body?.productConfiguration?.isProductLinkedToAsset;

    return productCode && isProductLinkedToAsset && isSaveOperationAvailable(this.view);
};
