const { documentNumberRegExp } = require('@config-rgsl/asset-directory/lib/assetHelper');

module.exports = function mapping(input) {
    const commonBody = {
        originalDocumentNumber: this.businessContext.documentNumber?.match(documentNumberRegExp)[0] ?? input.originalDocumentNumber?.match(documentNumberRegExp)[0],
        seqNumber: input.seqNumber ?? 0,
        isRiskTransferedToClient: input.mainInformation?.isRiskTransferedToClient,
        currency: input.mainInformation?.currency,
        informationResource: input.mainInformation?.informationResource,
        paperShortName: input.mainInformation?.paperShortName,
        issuer: input.mainInformation?.issuer,
        activeType: input.mainInformation?.activeType,
        assetSize: input.mainInformation?.assetSize,
        acquisitionRate: input.mainInformation?.acquisitionRate,
        unitPurchasePrice: input.mainInformation?.unitPurchasePrice,
        bondDenominationInCurrency: input.mainInformation?.bondDenominationInCurrency,
        assetUnitPrice: input.mainInformation?.assetUnitPrice,
        endUnitPrice: input.mainInformation?.endUnitPrice,
        idIsin: input.mainInformation?.idIsin,
        assetConditions: input.assetConditions,
        term: input.mainInformation?.term
    };

    return commonBody;
};
