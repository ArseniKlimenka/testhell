'use strict';

const { getValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');

/**
 * @errorCode {errorCode} InsuranceMethodologyConclusionIsRequired
 */

module.exports = function rule(input) {

    const validationErrors = [];

    const conclusionText = getValue(input, 'body.amendmentData.nonFinChangeAmendmentData.amendmentInfo.approvalConclusions.insuranceMethodologyConclusion');

    if (!conclusionText) {

        validationErrors.push({
            errorCode: 'InsuranceMethodologyConclusionIsRequired',
            errorDataPath: '/Body/amendmentData/nonFinChangeAmendmentData/amendmentInfo/approvalConclusions/insuranceMethodologyConclusion'
        });
    }

    return validationErrors;
};
