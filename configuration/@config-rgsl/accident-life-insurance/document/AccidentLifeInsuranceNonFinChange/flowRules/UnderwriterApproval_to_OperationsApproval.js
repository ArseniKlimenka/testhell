'use strict';

/**
 * @errorCode {errorCode} UnderwriterConclusionIsRequired
 */

module.exports = function rule(input) {

    const validationErrors = [];

    const conclusionText = input.body?.amendmentData?.nonFinChangeAmendmentData?.amendmentInfo?.approvalConclusions?.underwriterConclusion;

    if (!conclusionText) {

        validationErrors.push({
            errorCode: 'UnderwriterConclusionIsRequired',
            errorDataPath: '/Body/amendmentData/nonFinChangeAmendmentData/amendmentInfo/approvalConclusions/underwriterConclusion'
        });
    }

    return validationErrors;
};
