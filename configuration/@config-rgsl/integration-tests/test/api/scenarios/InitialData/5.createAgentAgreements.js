const { shuffle } = require('@config-rgsl/infrastructure/lib/ArrayUtilsImpl');
const agentAgreementExecutor = require('../lib/agentAgreement/executor.js');

async function createAgentAgreements(step, context, stepContext) {

    if (context.alreadyExecuted) {
        return;
    }

    const templates = [
        'BFKO',
        'PSB',
        'DEMO',
        'AKCEPT',
        'AKBARS',
        'ZENIT',
        'BFKOAUTO',
        'PSBVIP',
        'OAS',
        'MINBANK',
        'SMP',
        'SOVKOMBANK',
        'ROSBANK',
        'REINVEST',
        'LIFEINVEST',
        'VTB',
        'VTBMASS',
        'POCHTABANK',
        'UBRRMASS'
    ];

    shuffle(templates);

    context.agentAgreements = [];

    for (let i = 0; i < templates.length; i++) {
        const template = templates[i];

        const organisationUnit = context.organisationUnits.find(obj => obj.template === template);
        const partner = context.partners.find(obj => obj.template === template);

        const request = stepContext.requests[template];
        request.body.organisation.organisationUnit.code = organisationUnit && organisationUnit.Code;
        request.body.organisation.organisationUnit.name = organisationUnit && organisationUnit.name;
        request.body.participants.agent.serviceProviderCode = partner && partner.Code;
        request.body.participants.agent.partyCode = partner && partner.partyCode;
        request.body.participants.agent.fullName = partner && partner.partnerName;
        const result = await agentAgreementExecutor.createAndActivate(request, stepContext.actor);
        context.agentAgreements.push({
            template: template,
            Number: result.number,
            Id: result.id,
        });
        console.log("AgentAgreement created: " + JSON.stringify({
            template: template,
            Number: result.number,
            Id: result.id,
        }));
    }
}

module.exports = {
    createAgentAgreements,
};
