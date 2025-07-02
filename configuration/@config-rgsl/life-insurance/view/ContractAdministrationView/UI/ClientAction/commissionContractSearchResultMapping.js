'use strict';

module.exports = async function commissionContractSearchResultMapping(input, ambientProperties) {

    const lookupSelection = input.getLookupSelection();

    if (lookupSelection[0] && lookupSelection[0].resultData) {

        const partner = lookupSelection[0].resultData.partner;

        input.rootContext.Body.commissionContract =
        {
            number: lookupSelection[0].resultData.number,
            agentName: partner.partnerShortDescription || partner.partnerDescription,
            agentServiceProviderCode: partner.partnerCode,
            effectiveFrom: lookupSelection[0].resultData.startDate,
            effectiveTo: lookupSelection[0].resultData.endDate,
        };
    }

    this.view.rebind();
    this.view.reevaluateRules();
    this.view.validate();
};
