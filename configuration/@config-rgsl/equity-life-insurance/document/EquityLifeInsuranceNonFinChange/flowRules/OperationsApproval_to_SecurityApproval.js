'use strict';

const { getValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');

/**
 * @errorCode {errorCode} RejectionMustBeEmpty
 * @errorCode {errorCode} SecurityRequestIsRequired
 */

module.exports = function rule(input) {

    const validationErrors = [];

    const rejectionReason = getValue(input, 'body.amendmentData.nonFinChangeAmendmentData.amendmentInfo.rejectionReason');

    if (rejectionReason) {

        validationErrors.push({
            errorCode: 'RejectionMustBeEmpty',
            errorDataPath: '/Body/amendmentData/nonFinChangeAmendmentData/amendmentInfo/rejectionReason'
        });
    }

    const requestText = getValue(input, 'body.amendmentData.nonFinChangeAmendmentData.amendmentInfo.approvalRequests.securityRequest');

    if (!requestText) {

        validationErrors.push({
            errorCode: 'SecurityRequestIsRequired',
            errorDataPath: '/Body/amendmentData/nonFinChangeAmendmentData/amendmentInfo/approvalRequests/securityRequest'
        });
    }

    return validationErrors;
};
