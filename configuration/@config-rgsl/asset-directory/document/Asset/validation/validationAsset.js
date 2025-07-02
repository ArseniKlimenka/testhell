'use strict';

/**
 * @errorCode {errorCode} emptyIsRiskTransferedToClient
 * @errorCode {errorCode} emptyCurrency
 * @errorCode {errorCode} emptyInformationResource
 * @errorCode {errorCode} emptyPaperShortName
 * @errorCode {errorCode} emptyIssuer
 * @errorCode {errorCode} emptyActiveType
 * @errorCode {errorCode} emptyIdIsin
 * @errorCode {errorCode} emptyAssetSize
 * @errorCode {errorCode} emptyUnitPurchasePrice
 * @errorCode {errorCode} emptyBondDenominationInCurrency
 * @errorCode {errorCode} emptyAssetUnitPrice
 * @errorCode {errorCode} emptyTerm
 * @errorCode {errorCode} duplicate
 * @errorCode {errorCode} assetMaturityDate
 */

module.exports = function validationAsset(input) {

    const validationErrors = [];

    const dataPath = this.businessContext.dataPath;
    const mainInformation = input.mainInformation;
    const isDuplicate = input.isDuplicate;

    if (!mainInformation?.isRiskTransferedToClient) {
        validationErrors.push({
            errorCode: "emptyIsRiskTransferedToClient",
            errorDataPath: dataPath + '/mainInformation/isRiskTransferedToClient'
        });
    }

    if (!mainInformation?.currency || !mainInformation?.currency.currencyCode) {
        validationErrors.push({
            errorCode: "emptyCurrency",
            errorDataPath: dataPath + '/mainInformation/currency'
        });
    }

    if (!mainInformation?.informationResource) {
        validationErrors.push({
            errorCode: "emptyInformationResource",
            errorDataPath: dataPath + '/mainInformation/informationResource'
        });
    }

    if (!mainInformation?.paperShortName) {
        validationErrors.push({
            errorCode: "emptyPaperShortName",
            errorDataPath: dataPath + '/mainInformation/paperShortName'
        });
    }

    if (!mainInformation?.issuer) {
        validationErrors.push({
            errorCode: "emptyIssuer",
            errorDataPath: dataPath + '/mainInformation/issuer'
        });
    }

    if (!mainInformation?.activeType) {
        validationErrors.push({
            errorCode: "emptyActiveType",
            errorDataPath: dataPath + '/mainInformation/activeType'
        });
    }

    if (!mainInformation?.idIsin) {
        validationErrors.push({
            errorCode: "emptyIdIsin",
            errorDataPath: dataPath + '/mainInformation/idIsin'
        });
    }

    if (!mainInformation?.assetSize) {
        validationErrors.push({
            errorCode: "emptyAssetSize",
            errorDataPath: dataPath + '/mainInformation/assetSize'
        });
    }

    if (!mainInformation?.unitPurchasePrice) {
        validationErrors.push({
            errorCode: "emptyUnitPurchasePrice",
            errorDataPath: dataPath + '/mainInformation/unitPurchasePrice'
        });
    }

    if (!mainInformation?.bondDenominationInCurrency) {
        validationErrors.push({
            errorCode: "emptyBondDenominationInCurrency",
            errorDataPath: dataPath + '/mainInformation/bondDenominationInCurrency'
        });
    }

    if (!mainInformation?.term) {
        validationErrors.push({
            errorCode: "emptyTerm",
            errorDataPath: dataPath + '/mainInformation/term'
        });
    }

    if (!mainInformation?.assetMaturityDate) {
        validationErrors.push({
            errorCode: "assetMaturityDate",
            errorDataPath: dataPath + '/mainInformation/assetMaturityDate'
        });
    }

    if (isDuplicate) {
        validationErrors.push({
            errorCode: "duplicate",
            errorDataPath: dataPath + '/mainInformation/idIsin'
        });
    }

    return validationErrors;

};
