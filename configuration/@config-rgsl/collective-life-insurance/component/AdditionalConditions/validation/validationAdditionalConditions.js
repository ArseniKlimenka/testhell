const { getValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');

/**
 * @errorCode {errorCode} gracePeriodIsRequired
 * @errorCode {errorCode} firstInstallmentDeadlineDateIsRequired
 * @errorCode {errorCode} coverageAreaIsRequired
 */

module.exports = function validationAdditionalConditions(input) {

    const validationErrors = [];
    const dataPath = this.businessContext.dataPath;
    const body = this.businessContext.rootData;

    const gracePeriod = getValue(input, 'gracePeriod', 0);
    const firstInstallmentDeadlineDate = getValue(input, 'firstInstallmentDeadlineDate');
    const coverageArea = getValue(input, 'coverageArea');

    if (gracePeriod == 0) {
        validationErrors.push({
            errorCode: "gracePeriodIsRequired",
            errorDataPath: dataPath + '/gracePeriod'
        });
    }

    if (!firstInstallmentDeadlineDate) {
        validationErrors.push({
            errorCode: "firstInstallmentDeadlineDateIsRequired",
            errorDataPath: dataPath + '/firstInstallmentDeadlineDate'
        });
    }

    if (!coverageArea) {
        validationErrors.push({
            errorCode: "coverageAreaIsRequired",
            errorDataPath: dataPath + '/coverageArea'
        });
    }

    return validationErrors;
};
