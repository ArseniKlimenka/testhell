'use strict';

const { getValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');
const dateUtils = require('@config-rgsl/infrastructure/lib/DateTimeUtils');

/**
 * @errorCode {errorCode} AmendmentIssueDateIsRequired
 * @errorCode {errorCode} AmendmentEffectiveDateIsRequired
 * @errorCode {errorCode} AcceptDateIsRequired
 * @errorCode {errorCode} BeneficiaryEditChangeTypeIsNotAllowedWhenHeritorsAreAvailable
 * @errorCode {errorCode} amendmentEffectiveDateMustBeEqualToAnyPeriodStartDate
 */

module.exports = function rootLevelValidation(input) {

    const body = this.businessContext.rootData;
    const dataPath = this.businessContext.dataPath;

    const validationErrors = [];

    if (!input.amendmentIssueDate) {

        validationErrors.push({
            errorCode: 'AmendmentIssueDateIsRequired',
            errorDataPath: dataPath + '/amendmentIssueDate'
        });
    }

    if (!input.amendmentEffectiveDate) {

        validationErrors.push({
            errorCode: 'AmendmentEffectiveDateIsRequired',
            errorDataPath: dataPath + '/amendmentEffectiveDate'
        });
    }

    const amendmentData = body.amendmentData?.finChangeAmendmentData;
    const amendmentEffectiveDate = amendmentData?.mainAttributes?.amendmentEffectiveDate;
    const startDate = body.policyTerms.startDate; getValue(body, 'policyTerms.startDate');
    const endDate = body.policyTerms.endDate;
    const contractPeriods = dateUtils.getPeriodsTableByMonths(startDate, endDate, 12) ?? [];

    if (amendmentEffectiveDate && !contractPeriods.some(p => p.periodStartDate === amendmentEffectiveDate)) {

        validationErrors.push({
            errorCode: "amendmentEffectiveDateMustBeEqualToAnyPeriodStartDate",
            errorDataPath: '/Body/amendmentData/finChangeAmendmentData/mainAttributes/amendmentEffectiveDate'
        });
    }

    return validationErrors;
};
