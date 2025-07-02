'use strict';

module.exports = function paymentIntermediateApplicationReportOnSelected(input) {

    input.context.Body.paymentIntermediateApplicationReportPartner = {
        partnerDescription: input.getLookupSelection()[0].resultData.partyDisplayName,
        partnerCode: input.getLookupSelection()[0].resultData.serviceProviderCode
    };
};
