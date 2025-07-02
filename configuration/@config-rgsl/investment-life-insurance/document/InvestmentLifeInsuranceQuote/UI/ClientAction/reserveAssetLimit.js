const { callIntegrationService } = require('@config-rgsl/infrastructure/lib/CommonUtils');

module.exports = async function reserveAssetLimit(input, ambientProperties) {

    const schemaValidations = input.context.ValidationResult?.schemaValidations ?? [];
    if (schemaValidations.find(_ => _.code == 'NotAvailableLimitForRegistration')) {

        return;
    }

    const document = input.context.Body;
    const basicAssetProperties = document.basicAssetProperties;
    const asset = basicAssetProperties?.assetProperties[0]?.asset;
    const isin = asset?.idIsin;
    if (!isin) {
        await showMessage('По договору не заполнены активы!', ambientProperties);

        return;
    }

    const amountToReserve = basicAssetProperties?.assetUnitsCountOnClient ?? 0;
    if (amountToReserve == 0) {
        await showMessage('Количество единиц актива у клиента равно нулю!', ambientProperties);

        return;
    }

    await this.view.save();

    const assetSize = asset?.assetSize ?? 0;
    const productLimit = asset?.productLimit ?? 0;
    const limit = assetSize > productLimit ? productLimit : assetSize;

    const request = {
        data: {
            contractNumber: input.context.Number,
            isin: isin,
            amountToReserve: amountToReserve,
            limit: limit
        }
    };

    this.view.startBlockingUI();

    try {
        await callIntegrationService(ambientProperties, 'AssetLimitReserveIS', request);
    } catch (error) {
        const errorMessage = error.error.data?.errorResponse?.message || error.error.message || error.error.Message || 'UnknownError';
        await showMessage(errorMessage, ambientProperties);
    } finally {
        this.view.stopBlockingUI();
    }

    this.view.save();
};

async function showMessage(msg, ambientProperties) {
    await ambientProperties.services.confirmationDialog.showError(msg, undefined, undefined, 1);
}
