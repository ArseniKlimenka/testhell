'use strict';

module.exports = function partnerOnSelected(input) {

    input.context.Body.partner = {
        partnerDescription: input.getLookupSelection()[0].resultData.partyDisplayName,
        partnerCode: input.getLookupSelection()[0].resultData.serviceProviderCode,
        partnerShortDescription: input.getLookupSelection()[0].resultData.partyShortName,
        partnerBusinessCode: input.getLookupSelection()[0].resultData.businessCode
    };
    input.context.Body.insuranceProduct = {};

    this.view.rebind();
    this.view.validate();
    this.view.reevaluateRules();
};
