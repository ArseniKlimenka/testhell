'use strict';

/**
 * @errorCode {errorCode} ResponseFromClientIsRequired
 */

module.exports = function rule(input) {

    const validationErrors = [];

    const conclusionText = input.body?.amendmentData?.nonFinChangeAmendmentData?.amendmentInfo?.approvalConclusions?.responseFromClient;

    if (!conclusionText) {

        validationErrors.push({
            errorCode: 'ResponseFromClientIsRequired',
            errorDataPath: '/Body/amendmentData/nonFinChangeAmendmentData/amendmentInfo/approvalConclusions/responseFromClient'
        });
    }

    return validationErrors;
};
