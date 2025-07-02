'use strict';
/* eslint no-undef: "off"*/

/**
 * @errorCode {errorCode} AllClaimPaymentOrdersIsNotCancelled
 */
module.exports = function rule(input) {

    const validationErrors = [];

    const enrich = documents.getDocumentConfiguration(this.businessContext.configurationCodeName, 1).processEnrichmentsFn;
    enrich(undefined, input.body, ['[CheckRelatedPaymentOrders]']);

    if (!input.body.tempTechnicalData?.isEnabledFlowToSentToPaymentToClaimManager) {

        validationErrors.push({
            errorCode: 'AllClaimPaymentOrdersIsNotCancelled',
            errorDataPath: '/tempTechnicalData/isEnabledFlowToSentToPaymentToClaimManager'
        });
    }

    return validationErrors;
};
