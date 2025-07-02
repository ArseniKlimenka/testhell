'use strict';

/**
 * @errorCode {errorCode} ActuaryConclusionIsRequired
 */

module.exports = function rule(input) {

    const validationErrors = [];

    const conclusionText = input.body?.amendmentData?.nonFinChangeAmendmentData?.amendmentInfo?.approvalConclusions?.actuaryConclusion;

    if (!conclusionText) {

        validationErrors.push({
            errorCode: 'ActuaryConclusionIsRequired',
            errorDataPath: '/Body/amendmentData/nonFinChangeAmendmentData/amendmentInfo/approvalConclusions/actuaryConclusion'
        });
    }

    return validationErrors;
};
