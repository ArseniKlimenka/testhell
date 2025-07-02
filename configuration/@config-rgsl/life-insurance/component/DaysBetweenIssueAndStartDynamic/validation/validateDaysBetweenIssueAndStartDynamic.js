'use strict';

const lifeInsuranceConstants = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');
const { daysCount, sportProducts } = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');

/**
 * @errorCode {errorCode} daysBetweenIssueAndStartDynamicLess1
 * @errorCode {errorCode} daysBetweenIssueAndStartDynamicMore21
*/
module.exports = function validateDaysBetweenIssueAndStartDynamic(input, ambientProperties) {

    const validationErrors = [];

    const dataPath = this.businessContext.dataPath;
    const body = this.businessContext.rootData;
    const basicConditions = body?.basicConditions;
    const daysBetweenIssueAndStartDynamic = basicConditions?.daysBetweenIssueAndStartDynamic;
    const insuranceTermsDays = basicConditions?.insuranceTermsDays;
    const productCode = body?.mainInsuranceConditions?.insuranceProduct?.productCode;

    if (sportProducts.includes(productCode)) {

        if ([daysCount.oneDay, daysCount.week, daysCount.month].includes(insuranceTermsDays?.value)) {

            if (daysBetweenIssueAndStartDynamic < 1) {
                validationErrors.push({
                    errorCode: "daysBetweenIssueAndStartDynamicLess1",
                    errorDataPath: dataPath
                });
            }
            else if (daysBetweenIssueAndStartDynamic > 21) {
                validationErrors.push({
                    errorCode: "daysBetweenIssueAndStartDynamicMore21",
                    errorDataPath: dataPath
                });
            }
        }
    }

    return validationErrors;
};
