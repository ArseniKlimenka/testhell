'use strict';
const { getServiceProviderData } = require('@config-rgsl/acc-commission/lib/actUtils');

module.exports = async function onLoadAADocumentSearchView(input, ambientProperties) {
    const agentCode = input.context.Body.aaServiceProviderCode;
    const lookup = this.getLookup();

    if (agentCode) {
        const spData = await getServiceProviderData(ambientProperties, agentCode);

        if (spData) {
            lookup.setSearchRequest({
                data: {
                    criteria: {
                        agentServiceProviderCode: spData.serviceProviderCode,
                        agentName: spData.partyShortName || spData.partyDisplayName,
                    }
                }
            });

            lookup.setProtectedFields(['agentServiceProviderCode', 'agentName', 'agentPersonalNumber', 'agentPartyType'], true);
            lookup.getControlByElementId('agentSearchLookup').disableElement();
            lookup.getControlByElementId('agentPersonalNumber').disableElement();
            lookup.getControlByElementId('agentPartyType').disableElement();
        }
    }
};
