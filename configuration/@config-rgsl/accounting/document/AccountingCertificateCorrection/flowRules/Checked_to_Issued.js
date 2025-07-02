'use strict';

const { accountingCertificateAttachmentTypes } = require('@config-rgsl/accounting/lib/accountingCertificateHelper');

/**
 * @errorCode {errorCode} RequiredAttachmentIsAbsent
 */

module.exports = function rule(input) {

    const validationErrors = [];

    const attachments = input.attachments;

    const canSetIssueState = attachments?.filter((x) => x.attachmentType === accountingCertificateAttachmentTypes.taxDeductionCertificate).length > 0;

    if (!canSetIssueState) {
        validationErrors.push({
            errorCode: 'RequiredAttachmentIsAbsent',
        });
    }

    return validationErrors;
};
