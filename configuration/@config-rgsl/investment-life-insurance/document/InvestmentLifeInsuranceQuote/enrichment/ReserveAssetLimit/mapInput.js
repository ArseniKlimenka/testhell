module.exports = function mapping(input) {

    const isin = input.basicAssetProperties?.assetProperties[0]?.asset?.idIsin;
    const amountToReserve = input.basicAssetProperties?.assetUnitsCountOnClient ?? 0;
    const assetSize = input.basicAssetProperties?.assetProperties[0]?.asset?.assetSize ?? 0;
    const productLimit = input.basicAssetProperties?.assetProperties[0]?.asset?.productLimit ?? 0;
    const limit = assetSize > productLimit ? productLimit : assetSize;

    const request = {
        contractNumber: this.businessContext.documentNumber,
        isin: isin,
        amountToReserve: amountToReserve,
        limit: limit,
    };

    return request;
};
