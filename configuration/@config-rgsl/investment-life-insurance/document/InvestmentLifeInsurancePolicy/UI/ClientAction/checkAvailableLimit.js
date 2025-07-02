const { callDataSource } = require('@config-rgsl/infrastructure/lib/CommonUtils');

module.exports = async function checkAvailableLimit(input, ambientProperties) {

    const basicAssetProperties = input.context.Body.basicAssetProperties;
    if (!basicAssetProperties) {
        return null;
    }

    const assetProperties = basicAssetProperties.assetProperties ?? [];
    if (assetProperties.length == 0) {
        return null;
    }

    const request = {
        data: {
            criteria: {
                isin: assetProperties[0].asset.idIsin
            }
        }
    };

    const response = await callDataSource(ambientProperties, 'AssetLimitDataSource', request);
    const reservedByAsset = response.data.amount;

    const assetUnitsCountOnClient = basicAssetProperties.assetUnitsCountOnClient;
    const productLimit = assetProperties[0].asset.productLimit ?? 0;
    const assetSize = assetProperties[0].asset.assetSize ?? 0;
    const limit = productLimit < assetSize ? productLimit : assetSize;

    if (reservedByAsset + assetUnitsCountOnClient <= limit) {
        return null;
    }

    const currentUserRoles = ambientProperties.applicationContext.currentUser().getUserRoles() || [];
    const isSkipCheckAvailableLimit = currentUserRoles.some(item => item.ApplicationRoleCodeName == 'SkipCheckAssetAvailableLimit');

    if (isSkipCheckAvailableLimit) {
        return {
            message: 'Нет доступного лимита для восстановления договора. Хотите восстановить Договор?'
        };
    }

    throw new Error('Нет доступного лимита для восстановления договора!');
};
