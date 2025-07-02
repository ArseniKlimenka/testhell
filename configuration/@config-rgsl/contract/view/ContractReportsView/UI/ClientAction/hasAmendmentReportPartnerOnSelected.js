'use strict';

module.exports = function hasAmendmentReportPartnerOnSelected(input) {

    input.context.Body.hasAmendmentReportPartner = {
        partnerDescription: input.getLookupSelection()[0].resultData.partyDisplayName,
        partnerCode: input.getLookupSelection()[0].resultData.serviceProviderCode
    };
};
