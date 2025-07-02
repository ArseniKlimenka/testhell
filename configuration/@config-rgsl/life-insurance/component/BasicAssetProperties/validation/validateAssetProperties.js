const constants = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');

/**
 * @errorCode {errorCode} BasicAssetPropertiesEmpty
 * @errorCode {errorCode} BasicAssetPropertiesContainsDuplicates
 * @errorCode {errorCode} BasicAssetPropertiesOverflow
 * @errorCode {errorCode} AvailableLimitForRegistration
 * @errorCode {errorCode} NotAvailableLimitForRegistration
 * @errorCode {errorCode} AssetTermNotEqualsPolicyTerm
 */

module.exports = function validateAssetProperties(input) {

    const body = this.businessContext?.rootData;
    const basicAssetProperties = input.assetProperties;
    const validationErrors = [];
    const dataPath = this.businessContext.dataPath;
    const isBasicAssetPropertiesEnabled = body?.productConfiguration?.isProductLinkedToAsset;

    if (isBasicAssetPropertiesEnabled && (!basicAssetProperties || basicAssetProperties.length === 0)) {

        validationErrors.push({
            errorCode: "BasicAssetPropertiesEmpty",
            errorDataPath: dataPath
        });
    }

    if (isBasicAssetPropertiesEnabled && basicAssetProperties?.length > 0) {

        const set = new Set(basicAssetProperties.map(v => v.asset.assetNumber));
        if (set.size < basicAssetProperties.length) {
            validationErrors.push({
                errorCode: "BasicAssetPropertiesContainsDuplicates",
                errorDataPath: dataPath
            });
        }
    }

    if (isBasicAssetPropertiesEnabled && basicAssetProperties?.length > 1) {

        validationErrors.push({
            errorCode: "BasicAssetPropertiesOverflow",
            errorDataPath: dataPath
        });
    }

    const contractType = this.businessContext.configurationDimensions.contractType;
    if (contractType == constants.contractType.Quote && input.assetProperties.length > 0) {
        const availableLimitCount = input.availableLimitCount ?? 0;
        const assetUnitsCountOnClient = input.assetUnitsCountOnClient ?? 0;
        if (availableLimitCount >= assetUnitsCountOnClient) {
            validationErrors.push({
                errorCode: "AvailableLimitForRegistration",
                reference: {
                    availableLimitRub: input.availableLimitRub
                },
                severity: "Note"
            });
        } else {
            validationErrors.push({
                errorCode: "NotAvailableLimitForRegistration",
                reference: {
                    availableLimitRub: input.availableLimitRub
                }
            });
        }
    }

    const term = input.assetProperties[0]?.asset?.term;
    const insuranceTerms = body.basicConditions?.insuranceTerms;
    if (term && insuranceTerms && term != insuranceTerms) {
        validationErrors.push({
            errorCode: "AssetTermNotEqualsPolicyTerm",
            errorDataPath: dataPath
        });
    }

    return validationErrors;
};
