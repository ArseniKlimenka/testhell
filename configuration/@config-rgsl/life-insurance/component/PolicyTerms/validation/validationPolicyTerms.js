const { getValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');
const constants = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');

/**
 * @errorCode {errorCode} endDateShouldBeMoreStartDate
 * @errorCode {errorCode} startDateIsEmpty
 * @errorCode {errorCode} endDateIsEmpty
 * @errorCode {errorCode} paymentPeriodLastDateShouldBeMoreStartDate
 */

module.exports = function validationPolicyTerms(input) {

    const validationErrors = [];
    const dataPath = this.businessContext.dataPath;
    const isCollectivePolicy = this.businessContext.configurationCodeName == constants.productCode.CollectiveLifeInsurancePolicy;
    const withTarification = getValue(this, 'businessContext.rootData.basicConditions.withTarification', false);
    const startDate = getValue(input, 'startDate');
    const endDate = getValue(input, 'endDate');
    const insuranceTermsDays = this.businessContext.rootData.basicConditions?.insuranceTermsDays?.value;
    const manualCorrection = input.manualCorrection;
    const paymentPeriodLastDate = input.paymentPeriodLastDate;

    if (isCollectivePolicy && !startDate) {

        validationErrors.push({
            errorCode: "startDateIsEmpty",
            errorDataPath: dataPath + '/startDate'
        });
    }

    if (isCollectivePolicy && !endDate && !withTarification) {

        validationErrors.push({
            errorCode: "endDateIsEmpty",
            errorDataPath: dataPath + '/endDate'
        });
    }

    if (insuranceTermsDays) {
        if (startDate > endDate) {
            validationErrors.push({
                errorCode: "endDateShouldBeMoreStartDate",
                errorDataPath: dataPath + '/endDate'
            });
        }
    }
    else {
        if (startDate >= endDate) {
            validationErrors.push({
                errorCode: "endDateShouldBeMoreStartDate",
                errorDataPath: dataPath + '/endDate'
            });
        }
    }

    if (manualCorrection && paymentPeriodLastDate < startDate) {
        validationErrors.push({
            errorCode: "paymentPeriodLastDateShouldBeMoreStartDate",
            errorDataPath: dataPath + '/paymentPeriodLastDate'
        });
    }

    return validationErrors;
};
