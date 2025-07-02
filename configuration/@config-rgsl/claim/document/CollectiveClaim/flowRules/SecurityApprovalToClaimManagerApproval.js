'use strict';

/**
 * @errorCode {errorCode} SecurityConclusionIsRequired
 */

module.exports = function rule(input) {

    const validationErrors = [];

    const securityConclusion = input.body.approvalConclusions?.securityConclusion;

    if (!securityConclusion) {

        validationErrors.push({
            errorCode: 'SecurityConclusionIsRequired',
            errorDataPath: '/Body/approvalConclusions/securityConclusion'
        });
    }

    return validationErrors;
};
