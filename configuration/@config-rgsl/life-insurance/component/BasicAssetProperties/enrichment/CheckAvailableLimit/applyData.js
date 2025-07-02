'use strict';

module.exports = function applyData(input, dataSourceResponse) {

    const reservedByAsset = dataSourceResponse.data.amount;

    const asset = input.assetProperties[0].asset;
    const productLimit = asset.productLimit ?? asset.assetSize;
    const assetSize = asset.assetSize ?? 0;
    const unitPurchasePrice = asset.unitPurchasePrice ?? 0;
    const bondDenominationInCurrency = asset.bondDenominationInCurrency ?? 0;
    const limit = productLimit < assetSize ? productLimit : assetSize;

    delete input.availableLimit;

    input.availableLimitCount = (limit - reservedByAsset);
    input.availableLimitRub = (limit - reservedByAsset) * unitPurchasePrice * bondDenominationInCurrency;
};
