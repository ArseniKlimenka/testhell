'use strict';

const { getValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');

/**
 * @errorCode {errorCode} RejectionReasonIsRequired
 */

module.exports = function rule(input) {

    const validationErrors = [];

    const rejectionReason = getValue(input, 'body.amendmentData.nonFinChangeAmendmentData.amendmentInfo.rejectionReason');

    if (!rejectionReason) {

        validationErrors.push({
            errorCode: 'RejectionReasonIsRequired',
            errorDataPath: '/Body/amendmentData/nonFinChangeAmendmentData/amendmentInfo/rejectionReason'
        });
    }

    return validationErrors;
};
