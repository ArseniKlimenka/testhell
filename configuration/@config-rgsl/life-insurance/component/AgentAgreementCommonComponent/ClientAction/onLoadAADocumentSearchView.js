'use strict';

module.exports = async function onLoadAADocumentSearchView(input) {
    const lookup = this.getLookup();

    lookup.setSearchRequest({
        data: {
            criteria: {
                agentServiceProviderCode: input.context.Body.mainInsuranceConditions.partner.partnerCode,
                agentName: input.context.Body.mainInsuranceConditions.partner.partnerDescription || input.context.Body.mainInsuranceConditions.partner.partnerShortDescription
            }
        }
    });

    lookup.setProtectedFields(['agentServiceProviderCode', 'agentName', 'agentPersonalNumber', 'agentPartyType'], true);
    lookup.getControlByElementId('agentSearchLookup').disableElement();
    lookup.getControlByElementId('agentPersonalNumber').disableElement();
    lookup.getControlByElementId('agentPartyType').disableElement();
};
