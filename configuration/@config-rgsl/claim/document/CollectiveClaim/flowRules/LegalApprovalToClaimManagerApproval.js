'use strict';

/**
 * @errorCode {errorCode} LegalConclusionIsRequired
 */

module.exports = function rule(input) {

    const validationErrors = [];

    const legalConclusion = input.body.approvalConclusions?.legalConclusion;

    if (!legalConclusion) {

        validationErrors.push({
            errorCode: 'LegalConclusionIsRequired',
            errorDataPath: '/Body/approvalConclusions/legalConclusion'
        });
    }

    return validationErrors;
};
