'use strict';

const { getValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');

/**
 * @errorCode {errorCode} RejectionMustBeEmpty
 * @errorCode {errorCode} LegalRequestIsRequired
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

    const requestText = getValue(input, 'body.amendmentData.nonFinChangeAmendmentData.amendmentInfo.approvalRequests.legalRequest');

    if (!requestText) {

        validationErrors.push({
            errorCode: 'LegalRequestIsRequired',
            errorDataPath: '/Body/amendmentData/nonFinChangeAmendmentData/amendmentInfo/approvalRequests/legalRequest'
        });
    }

    return validationErrors;
};
