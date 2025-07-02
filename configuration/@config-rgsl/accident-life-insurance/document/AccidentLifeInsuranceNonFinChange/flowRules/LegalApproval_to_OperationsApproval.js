'use strict';

/**
 * @errorCode {errorCode} LegalConclusionIsRequired
 */

module.exports = function rule(input) {

    const validationErrors = [];

    const conclusionText = input.body?.amendmentData?.nonFinChangeAmendmentData?.amendmentInfo?.approvalConclusions?.legalConclusion;

    if (!conclusionText) {

        validationErrors.push({
            errorCode: 'LegalConclusionIsRequired',
            errorDataPath: '/Body/amendmentData/nonFinChangeAmendmentData/amendmentInfo/approvalConclusions/legalConclusion'
        });
    }

    return validationErrors;
};
