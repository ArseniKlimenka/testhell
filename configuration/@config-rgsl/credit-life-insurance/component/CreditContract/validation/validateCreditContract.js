const { getValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');
const DateTimeUtils = require('@config-rgsl/infrastructure/lib/DateTimeUtils');
const { skipForMigrated } = require('@config-rgsl/life-insurance/lib/migrationValidationHelper');

/**
* @errorCode {errorCode} creditRateRefuseRequired
* @errorCode {errorCode} creditRateRefuseSmall
* @errorCode {errorCode} creditSumNetIsRequired
* @errorCode {errorCode} creditRateIsRequired
* @errorCode {errorCode} annuityPaymentSumIsRequired
*/

module.exports = function validateCreditContract(input, ambientProperties) {

    const validationErrors = [];
    const dataPath = this.businessContext.dataPath;
    const body = this.businessContext.rootData;

    const issueDate = getValue(body, 'basicConditions.issueDate');
    const creditRate = getValue(body, 'creditContract.creditRate');
    const creditRateRefuse = getValue(body, 'creditContract.creditRateRefuse');
    const creditProgramId = getValue(body, 'creditProgram.creditProgramId');
    const creditSumNet = getValue(body, 'creditContract.creditSumNet');
    const annuityPaymentSum = getValue(body, 'creditContract.annuityPaymentSum');

    const isAfterOrEqual20221001 = DateTimeUtils.isAfterOrEqual(DateTimeUtils.formatDate(issueDate), DateTimeUtils.formatDate('2022-10-01'));
    const is08or36 = creditProgramId == 'РЖ08' || creditProgramId == 'РЖ36';
    const skipMigrated = skipForMigrated(this.businessContext.rootData);

    if (is08or36 && isAfterOrEqual20221001) {
        if (!creditRateRefuse) {
            validationErrors.push({
                errorCode: "creditRateRefuseRequired",
                errorDataPath: dataPath + '/creditRateRefuse',
            });
        }
        if (creditRate && creditRateRefuse && creditRateRefuse <= creditRate) {
            validationErrors.push({
                errorCode: "creditRateRefuseSmall",
                errorDataPath: dataPath + '/creditRateRefuse',
            });
        }
    }

    if (!creditSumNet && !skipMigrated) {
        validationErrors.push({
            errorCode: "creditSumNetIsRequired",
            errorDataPath: dataPath + '/creditSumNet'
        });
    }

    if (!creditRate && !skipMigrated) {
        validationErrors.push({
            errorCode: "creditRateIsRequired",
            errorDataPath: dataPath + '/creditRate'
        });
    }

    if (!annuityPaymentSum && !skipMigrated) {
        validationErrors.push({
            errorCode: "annuityPaymentSumIsRequired",
            errorDataPath: dataPath + '/annuityPaymentSum'
        });
    }

    return validationErrors;

};
