
'use strict';

const { cancellationAmendmentState } = require('@config-rgsl/life-insurance/lib/amendmentConstants');

/**
* @errorCode {errorCode} hasActiveCancellationInquiries
*/
module.exports = function validateInquiries(input, ambientProperties) {

    const validationErrors = [];
    const state = this.businessContext.documentState;

    if (state === cancellationAmendmentState.Active ||
        state === cancellationAmendmentState.SentToPayment ||
        state === cancellationAmendmentState.Paid ||
        state === cancellationAmendmentState.Cancelled) {

        return validationErrors;
    }

    const body = this.businessContext.rootData;
    const inquiries = body.tempTechnicalData?.inquiries ?? [];

    const hasActiveInquiries = inquiries.some(i => i.stateCode === 'Draft');

    if (hasActiveInquiries) {

        validationErrors.push({
            errorCode: "hasActiveCancellationInquiries",
            severity: 'Warning'
        });
    }

    return validationErrors;
};
