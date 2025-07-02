'use strict';
/* eslint no-undef: "off"*/

/**
 * @errorCode {errorCode} noActiveInquiriesFound
 * @errorCode {errorCode} RejectionMustBeEmpty
 * @errorCode {errorCode} RejectionNoteMustBeEmpty
 */

module.exports = function rule(input) {

    const validationErrors = [];

    const rejectionReason = input.body.mainAttributes?.rejectionReason;

    if (rejectionReason) {

        validationErrors.push({
            errorCode: 'RejectionMustBeEmpty',
            errorDataPath: '/Body/mainAttributes/rejectionReason'
        });
    }

    const rejectionNote = input.body.mainAttributes?.rejectionNote;

    if (rejectionNote) {

        validationErrors.push({
            errorCode: 'RejectionNoteMustBeEmpty',
            errorDataPath: '/Body/mainAttributes/rejectionNote'
        });
    }

    const enrich = documents.getDocumentConfiguration(this.businessContext.configurationCodeName, 1).processEnrichmentsFn;

    input.body.tempTechnicalData = {
        inquiries: []
    };

    enrich(undefined, input.body, ['[SetEndowmentInquiries]']);

    const inquiries = input.body.tempTechnicalData.inquiries;
    const hasActiveInquiries = inquiries.some(i => i.stateCode === 'Draft');

    if (!hasActiveInquiries) {

        validationErrors.push({
            errorCode: 'noActiveInquiriesFound'
        });
    }

    return validationErrors;
};
