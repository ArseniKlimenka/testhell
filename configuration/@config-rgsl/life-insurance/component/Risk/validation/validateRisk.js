const { getValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');

/**
 * @errorCode {errorCode} underwriterRatioWrong
 * @errorCode {errorCode} underwriterPremiumWrong
 * @errorCode {errorCode} endDateMustBeGreaterThanStartDate
 * @errorCode {errorCode} insuredSumMustBeSetForAllPeriods
 */

module.exports = function validateRisk(input) {

    const validationErrors = [];
    const dataPath = this.businessContext.dataPath;

    const underwriterRatio = getValue(input, 'underwriterRatio', 1);
    const underwriterPremium = getValue(input, 'underwriterPremium', 0);

    if (underwriterRatio < 1 || underwriterRatio > 10) {
        validationErrors.push({
            errorCode: 'underwriterRatioWrong',
            errorDataPath: `${dataPath}/underwriterRatio`
        });
    }

    if (underwriterPremium < 0 || underwriterPremium > 100) {
        validationErrors.push({
            errorCode: 'underwriterPremiumWrong',
            errorDataPath: `${dataPath}/underwriterPremium`
        });
    }

    const startDate = input.startDate;
    const endDate = input.endDate;

    if (startDate && endDate && endDate < startDate) {

        validationErrors.push({
            errorCode: 'endDateMustBeGreaterThanStartDate',
            errorDataPath: `${dataPath}/endDate`
        });
    }

    const periods = input.riskInsuredSumByPeriod ?? [];

    if (periods.some(r => r.insuredSum === undefined)) {

        validationErrors.push({
            errorCode: 'insuredSumMustBeSetForAllPeriods',
            errorDataPath: `${dataPath}/riskInsuredSumByPeriod`
        });
    }

    return validationErrors;
};
