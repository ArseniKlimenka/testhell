'use strict';

module.exports = function partnerOnSelected(input) {

    input.context.Body.partner = {
        partnerDescription: input.getLookupSelection()[0].resultData.partyDisplayName,
        partnerCode: input.getLookupSelection()[0].resultData.serviceProviderCode,
        partnerBusinessCode: input.getLookupSelection()[0].resultData.businessCode
    };

    this.view.rebind();
    this.view.validate();
    this.view.reevaluateRules();

};
