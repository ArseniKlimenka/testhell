'use strict';

const { getValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');

/**
 * @errorCode {errorCode} RejectionMustBeEmpty
 * @errorCode {errorCode} RequestToClientIsRequired
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

    const requestText = getValue(input, 'body.amendmentData.nonFinChangeAmendmentData.amendmentInfo.approvalRequests.requestToClient');

    if (!requestText) {

        validationErrors.push({
            errorCode: 'RequestToClientIsRequired',
            errorDataPath: '/Body/amendmentData/nonFinChangeAmendmentData/amendmentInfo/approvalRequests/requestToClient'
        });
    }

    return validationErrors;
};
