/**
 * @errorCode {errorCode} ManualRateIsEmpty
 */

module.exports = function validateBasicAssetProperties(input) {

    const validationErrors = [];
    const dataPath = this.businessContext.dataPath;

    const manualRate = input.rateOfReturnEquityActives?.manualRate;
    if (!manualRate) {
        validationErrors.push({
            errorCode: "ManualRateIsEmpty",
            errorDataPath: dataPath + '/rateOfReturnEquityActives'
        });
    }

    return validationErrors;
};
