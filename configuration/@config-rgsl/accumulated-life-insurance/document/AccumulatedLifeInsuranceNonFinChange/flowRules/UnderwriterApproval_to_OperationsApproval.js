'use strict';

const { getValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');

/**
 * @errorCode {errorCode} UnderwriterConclusionIsRequired
 */

module.exports = function rule(input) {

    const validationErrors = [];

    const conclusionText = getValue(input, 'body.amendmentData.nonFinChangeAmendmentData.amendmentInfo.approvalConclusions.underwriterConclusion');

    if (!conclusionText) {

        validationErrors.push({
            errorCode: 'UnderwriterConclusionIsRequired',
            errorDataPath: '/Body/amendmentData/nonFinChangeAmendmentData/amendmentInfo/approvalConclusions/underwriterConclusion'
        });
    }

    return validationErrors;
};
