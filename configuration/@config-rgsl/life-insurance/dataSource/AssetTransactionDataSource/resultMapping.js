module.exports = function resultMapping(input) {

    const output = {};

    const id_isin = input.ID_ISIN ?? 0;
    const dealDate = input.DEAL_DATE ?? 0;
    const contractNumber = input.CONTRACT_NUMBER ?? 0;
    const assetUnitCount = input.ASSET_UNITS_COUNT ?? 0;
    const state = input.STATE ?? 0;
    const assetUnitPrice = input.ASSET_UNIT_PRICE ?? 0;

    output.id_isin = id_isin;
    output.dealDate = dealDate;
    output.contractNumber = contractNumber;
    output.assetUnitCount = assetUnitCount;
    output.state = state;

    if (state === 'Activated') {
        output.purchase = assetUnitCount;
        output.assetUnitPrice = assetUnitPrice;
    } else {
        output.sale = assetUnitCount;
    }

    return output;
};
