'use strict';

const { getAssetReservedSizeData } = require('@config-rgsl/asset-directory/lib/assetHelper');

module.exports = async function calculateAvailableBalance(input, ambientProperties) {

    const idIsin = input.context?.Body?.mainInformation?.idIsin;

    const assetReservedSize = await getAssetReservedSizeData(idIsin, ambientProperties);

    const freeAssetSize = input.context?.Body?.mainInformation?.assetSize - assetReservedSize;
    input.context.Body.availableBalance = freeAssetSize;

    return true;
};
