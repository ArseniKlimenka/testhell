'use strict';

const { generate } = require('@config-rgsl/infrastructure/lib/GuidHelper');

module.exports = function accountingCertificateMapping({
    id,
    number,
    state,
    body,
    commonBody,
    dimensions
}, sinkExchange) {

    const originalDocumentNumber = body.originalDocumentNumber ?? number;
    const seqNumber = body.seqNumber;

    const isRiskTransferedToClient = body.mainInformation?.isRiskTransferedToClient;
    const currencyCode = body.mainInformation?.currency?.currencyCode;
    const informationResource = body.mainInformation?.informationResource;
    const paperShortName = body.mainInformation?.paperShortName;
    const issuer = body.mainInformation?.issuer;
    const activeType = body.mainInformation?.activeType;

    const idIsin = body.mainInformation?.idIsin;
    const assetSize = body.mainInformation?.assetSize;

    const acquisitionRate = body.mainInformation?.acquisitionRate;
    const unitPurchasePrice = body.mainInformation?.unitPurchasePrice;
    const bondDenominationInCurrency = body.mainInformation?.bondDenominationInCurrency;

    const assetUnitPrice = body.mainInformation?.assetUnitPrice;
    const endUnitPrice = body.mainInformation?.endUnitPrice;
    const term = body.mainInformation?.term;
    const entityCode = body.entityCode;

    const assetConditions = [];
    const productsData = [];
    if (commonBody.assetConditions) {
        assetConditions.push(...commonBody.assetConditions.map(_ => {
            const refId = generate();

            _.insuranceProduct.map(x => {
                productsData.push(
                    {
                        CONDITION_PRODUCT_REF_ID: refId,
                        PRODUCT_CODE: x.productCode
                    }
                );
            });

            const partnerCode = _.partner.partnerCode;
            return {
                ASSET_NUMBER: number,
                PARTNER_CODE: partnerCode,
                CONDITION_PRODUCT_REF_ID: refId,
                INSURANCE_START_DATE: _.startDate ?? '1900-01-01',
                LIMIT: _.limit,
            };
        }));
    }

    const result = {

        'PAS_IMPL.ASSET_HUB': [{
            ASSET_NUMBER: number
        }],

        'PAS_IMPL.ASSET_SAT': [{
            ASSET_NUMBER: number,
            STATE: state,
            ORIGINAL_DOCUMENT_NUMBER: originalDocumentNumber,
            SEQ_NUMBER: seqNumber,
            IS_RISK_TRANSFERED_TO_CLIENT: isRiskTransferedToClient,
            CURRENCY_CODE: currencyCode,
            INFORMATION_RESOURCE: informationResource,
            PAPER_SHORT_NAME: paperShortName,
            ID_ISIN: idIsin,
            ISSUER: issuer,
            ACTIVE_TYPE: activeType,
            ASSET_SIZE: assetSize,
            ACQUISITION_RATE: acquisitionRate,
            UNIT_PURCHASE_PRICE: unitPurchasePrice,
            BOND_DENOMINATION_IN_CURRENCY: bondDenominationInCurrency,
            ASSET_UNIT_PRICE: assetUnitPrice,
            END_UNIT_PRICE: endUnitPrice,
            TERM: term
        }],

        'PAS_IMPL.ASSET_CONDITION_SAT': assetConditions,

        'PAS_IMPL.ASSET_CONDITION_LINK': [{
            ASSET_NUMBER: number
        }],

        'PAS_IMPL.ASSET_CONDITION_PRODUCT_VALUE': productsData,

        'PAS_IMPL.ASSET_ENTITY_HUB': [{
            ASSET_ENTITY_NUMBER: entityCode,
        }],

        'PAS_IMPL.ASSET_ENTITY_LINK': [{
            ASSET_NUMBER_ASSET_NUMBER: number,
            ASSET_ENTITY_NUMBER_ASSET_ENTITY_NUMBER: entityCode,
        }]
    };

    return result;
};
