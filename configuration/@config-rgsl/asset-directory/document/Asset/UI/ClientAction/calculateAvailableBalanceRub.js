'use strict';

const { getAssetReservedSizeData } = require('@config-rgsl/asset-directory/lib/assetHelper');

module.exports = async function calculateAvailableBalanceRub(input, ambientProperties) {
    const idIsin = input.context?.Body?.mainInformation?.idIsin;
    const mainInformation = input.context?.Body?.mainInformation;
    const assetReservedSize = await getAssetReservedSizeData(idIsin, ambientProperties);

    const freeAssetSize = mainInformation?.assetSize - assetReservedSize;

    input.context.Body.availableBalanceRub = freeAssetSize * mainInformation?.unitPurchasePrice * mainInformation?.bondDenominationInCurrency;
};
