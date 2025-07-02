const { getValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');
const flowRulesHelper = require('@config-rgsl/life-insurance/lib/flowRulesHelper');
const amendmentUtils = require('@config-rgsl/life-insurance/lib/amendmentUtils');
/* eslint no-undef: "off"*/

/**
 * @errorCode {errorCode} noActiveInquiriesFound
 * @errorCode {errorCode} RejectionTextMustBeEmpty
 */

module.exports = function rule(input) {

    const validationErrors = [];

    const rejectionText = input.body.basicAmendmentConditions?.rejectionText;

    if (rejectionText) {

        validationErrors.push({
            errorCode: 'RejectionTextMustBeEmpty'
        });
    }

    const enrich = documents.getDocumentConfiguration(this.businessContext.configurationCodeName, 1).processEnrichmentsFn;

    input.body.tempTechnicalData = {
        inquiries: []
    };

    enrich(undefined, input.body, ['/tempTechnicalData/inquiries[SetCancellationInquiries]']);

    const inquiries = input.body.tempTechnicalData.inquiries;
    const hasActiveInquiries = inquiries.some(i => i.stateCode === 'Draft');

    if (!hasActiveInquiries) {

        validationErrors.push({
            errorCode: 'noActiveInquiriesFound'
        });
    }

    return validationErrors;
};
