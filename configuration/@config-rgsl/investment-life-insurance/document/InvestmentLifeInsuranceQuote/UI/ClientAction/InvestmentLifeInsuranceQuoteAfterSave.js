'use strict';

module.exports = function InvestmentLifeInsuranceQuoteAfterSave(input, ambientProperties) {

    const oldIdIsin = input.context.ClientViewModel?.idIsin ?? 'noIdIsin';
    const newIdIsin = input.context.Body?.basicAssetProperties?.assetProperties[0]?.asset?.idIsin ?? 'noIdIsin';
    const isProductLinkedToAsset = input.context.Body?.productConfiguration?.isProductLinkedToAsset ?? false;
    if (isProductLinkedToAsset && oldIdIsin != newIdIsin) {

        this.view.reloadEntity();
    }
};
