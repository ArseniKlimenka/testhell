'use strict';

const { partyType } = require('@config-rgsl/agent-agreement-base/lib/AAConsts');
const { throwResponseError } = require('@config-rgsl/infrastructure/lib/errorUtils');
const { getPartyData } = require('@config-rgsl/life-insurance/lib/partyUtils');

module.exports = async function refreshParticipantsData(input, ambientProperties) {

    const serviceProviderCode = input.componentContext.agent?.serviceProviderCode;

    if (!serviceProviderCode) {

        return;
    }

    const serviceProviderRequest = {
        method: 'post',
        url: 'api/entity-infrastructure/shared/datasource/ServiceProviderDataSource',
        data: {
            data: {
                criteria: {
                    serviceProviderCode: serviceProviderCode
                }
            }
        }
    };

    let serviceProviderResult;
    try {
        this.view.startBlockingUI();
        serviceProviderResult = await ambientProperties.services.api.call(serviceProviderRequest);
    }
    catch (err) {
        throwResponseError(err);
    }
    finally {
        this.view.stopBlockingUI();
    }

    let serviceProviderData = undefined;
    if (serviceProviderResult && serviceProviderResult.data) {

        serviceProviderData = serviceProviderResult.data[0].resultData;
    }

    const agent = input.componentContext.agent;
    if (serviceProviderData) {

        agent.serviceProviderCode = serviceProviderData.serviceProviderCode;
        agent.serviceProviderType = serviceProviderData.serviceProviderType;
        agent.partyCode = serviceProviderData.partyCode;
        agent.fullName = serviceProviderData.partyDisplayName;
        agent.businessCode = serviceProviderData.businessCode;
    }

    const agentPartyData = await getPartyData(ambientProperties, this, agent.partyCode);

    if (agentPartyData) {

        agent.partyType = agentPartyData.partyType;
        agent.partyBody = agentPartyData.body;
        agent.personalNumber = agentPartyData.tabNumber ?? agent.personalNumber;

        if (agentPartyData.partyType === partyType.legalEntity) {

            input.rootContext.Body.additionalAttributes.useNds = true;
        }
    }

    this.view.getControlByElementId("agentBankAccountId")?.clear();
    this.rebindComponent();
    ambientProperties.services.confirmationDialog.showConfirmation('Данные обновлены', 'OK', 'OK', 2);
};
