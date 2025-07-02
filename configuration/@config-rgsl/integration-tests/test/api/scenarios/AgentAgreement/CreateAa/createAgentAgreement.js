const initialDataHelpers = require('../../lib/common/initialDataHelpers');
const testHelperFuncs = require('../../lib/common/testHelperFuncs');
const agentAgreementExecutor = require('../../lib/agentAgreement/executor');

async function createAgentAgreement(step, context, stepContext) {

    const party = await initialDataHelpers.getDefaultPartyBFKO();
    const orgUnit = await initialDataHelpers.getDefaultOrganisationUnitBFKO();
    const serviceProvider = await initialDataHelpers.getDefaultServiceProvider(party.partyCode, 'Partner');
    const newNumber = await testHelperFuncs.getNextUnique();

    const request = stepContext.requests['body'];
    request.mainAttributes.manualDocumentNumber += newNumber;
    request.mainAttributes.externalDocumentNumber += newNumber;
    request.organisation.organisationUnit.code = orgUnit.organisationUnitCode;
    request.organisation.organisationUnit.name = orgUnit.fullName;
    request.participants.agent.serviceProviderCode = serviceProvider.serviceProviderCode;
    request.participants.agent.serviceProviderType = serviceProvider.serviceProviderType;
    request.participants.agent.partyCode = serviceProvider.partyCode;
    request.participants.agent.fullName = serviceProvider.partyDisplayName;
    const result = await agentAgreementExecutor.createAndActivate(({ body: request }), stepContext.actor);

    context.agentAgreement = {
        number: result.number,
        id: result.id,
    };
    console.log("AgentAgreement created: " + JSON.stringify(context.agentAgreement));
}

module.exports = {
    createAgentAgreement,
};
