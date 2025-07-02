'use strict';

/**
 * @errorCode {errorCode} InsuranceMethodologyConclusionIsRequired
 */

module.exports = function rule(input) {

    const validationErrors = [];

    const conclusionText = input.body?.amendmentData?.nonFinChangeAmendmentData?.amendmentInfo?.approvalConclusions?.insuranceMethodologyConclusion;

    if (!conclusionText) {

        validationErrors.push({
            errorCode: 'InsuranceMethodologyConclusionIsRequired',
            errorDataPath: '/Body/amendmentData/nonFinChangeAmendmentData/amendmentInfo/approvalConclusions/insuranceMethodologyConclusion'
        });
    }

    return validationErrors;
};
