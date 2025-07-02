module.exports = function resultMapping(input) {

    const output = {};

    const reservedForQuotesAssetUnitsCount = input.reservedForQuotesAssetUnitsCount ?? 0;
    const reservedForPoliciesAssetUnitsCount = input.reservedForPoliciesAssetUnitsCount ?? 0;
    const reservedForActivatedAssetUnitsCount = input.reservedForActivatedAssetUnitsCount ?? 0;
    const contractsInCooloffAssetUnitsCount = input.contractsInCooloffAssetUnitsCount ?? 0;
    const contractsNotInCooloffAssetUnitsCount = input.contractsNotInCooloffAssetUnitsCount ?? 0;
    const assetSize = input.ASSET_SIZE ?? 0;
    const originalDocumentNumber = input.ORIGINAL_DOCUMENT_NUMBER;
    const id_isin = input.ID_ISIN;

    output.id_isin = id_isin;
    output.originalDocumentNumber = originalDocumentNumber;
    output.assetSize = assetSize;
    output.reservedForQuotesAssetUnitsCount = reservedForQuotesAssetUnitsCount;
    output.reservedForPoliciesAssetUnitsCount = reservedForPoliciesAssetUnitsCount;
    output.issuedCount = reservedForPoliciesAssetUnitsCount + reservedForQuotesAssetUnitsCount;
    output.reservedForActivatedAssetUnitsCount = reservedForActivatedAssetUnitsCount;
    output.contractsInCooloffAssetUnitsCount = contractsInCooloffAssetUnitsCount;
    output.contractsNotInCooloffAssetUnitsCount = contractsNotInCooloffAssetUnitsCount;
    output.availableForSale = assetSize - (reservedForQuotesAssetUnitsCount + reservedForPoliciesAssetUnitsCount);

    output.reportDate = input.reportDate;

    return output;
};
