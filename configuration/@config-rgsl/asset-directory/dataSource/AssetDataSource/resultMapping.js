'use strict';

const { translationUtils } = require('@adinsure/runtime');

module.exports = function resultMapping(input) {

    const output = {};

    output.number = input.UNIVERSAL_VERSIONED_DOCUMENT_NUMBER;
    output.state = translationUtils.getTranslation('document/Asset/1', 'states', null, input.STATE);
    output.originalDocumentNumber = input.ORIGINAL_DOCUMENT_NUMBER;
    output.seqNumber = input.SEQ_NUMBER;
    output.isRiskTransferedToClient = input.IS_RISK_TRANSFERED_TO_CLIENT;
    output.currencyCode = input.CURRENCY_CODE;
    output.informationResource = input.INFORMATION_RESOURCE;
    output.paperShortName = input.PAPER_SHORT_NAME;
    output.idIsin = input.ID_ISIN;
    output.issuer = input.ISSUER;
    output.activeType = translationUtils.getTranslation('dataSource/AssetDataSource/1', 'enum', 'assetTypeComponent', input.ACTIVE_TYPE, 'AssetTypeComponent');
    output.assetSize = input.ASSET_SIZE;
    output.acquisitionRate = input.ACQUISITION_RATE;
    output.unitPurchasePrice = input.UNIT_PURCHASE_PRICE;
    output.bondDenominationInCurrency = input.BOND_DENOMINATION_IN_CURRENCY;
    output.assetUnitPrice = input.ASSET_UNIT_PRICE;
    output.endUnitPrice = input.END_UNIT_PRICE;

    return output;
};
