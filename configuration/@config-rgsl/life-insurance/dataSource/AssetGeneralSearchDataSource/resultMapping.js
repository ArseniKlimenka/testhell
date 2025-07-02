module.exports = function resultMapping(input) {

    const output = {};

    output.activeType = input.ACTIVE_TYPE;
    output.assetNumber = input.ASSET_NUMBER;
    output.idIsin = input.ID_ISIN;
    output.bondDenominationInCurrency = input.BOND_DENOMINATION_IN_CURRENCY;
    output.unitPurchasePrice = input.UNIT_PURCHASE_PRICE;
    output.assetSize = input.ASSET_SIZE;
    output.productLimit = input.LIMIT;
    output.term = input.TERM;
    output.paperShortName = input.PAPER_SHORT_NAME;
    output.currencyCode = input.CURRENCY_CODE;
    output.informationResource = input.INFORMATION_RESOURCE;

    return output;
};
