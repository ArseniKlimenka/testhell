'use strict';

/**
 * @errorCode {errorCode} RejectionMustBeEmpty
 * @errorCode {errorCode} SecurityRequestIsRequired
 */

module.exports = function rule(input) {

    const validationErrors = [];

    const rejectionReason = input.body?.amendmentData?.nonFinChangeAmendmentData?.amendmentInfo?.rejectionReason;

    if (rejectionReason) {

        validationErrors.push({
            errorCode: 'RejectionMustBeEmpty',
            errorDataPath: '/Body/amendmentData/nonFinChangeAmendmentData/amendmentInfo/rejectionReason'
        });
    }

    const requestText = input.body?.amendmentData?.nonFinChangeAmendmentData?.amendmentInfo?.approvalRequests?.securityRequest;

    if (!requestText) {

        validationErrors.push({
            errorCode: 'SecurityRequestIsRequired',
            errorDataPath: '/Body/amendmentData/nonFinChangeAmendmentData/amendmentInfo/approvalRequests/securityRequest'
        });
    }

    return validationErrors;
};
