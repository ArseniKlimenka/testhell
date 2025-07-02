'use strict';

const { getValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');

/**
 * @errorCode {errorCode} SecurityConclusionIsRequired
 */

module.exports = function rule(input) {

    const validationErrors = [];

    const conclusionText = getValue(input, 'body.amendmentData.nonFinChangeAmendmentData.amendmentInfo.approvalConclusions.securityConclusion');

    if (!conclusionText) {

        validationErrors.push({
            errorCode: 'SecurityConclusionIsRequired',
            errorDataPath: '/Body/amendmentData/nonFinChangeAmendmentData/amendmentInfo/approvalConclusions/securityConclusion'
        });
    }

    return validationErrors;
};
