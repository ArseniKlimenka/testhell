const { shuffle } = require('@config-rgsl/infrastructure/lib/ArrayUtilsImpl');
const partyExecutor = require('../lib/party/executor.js');

async function createLegalEntities(step, context, stepContext) {

    if (context.alreadyExecuted) {
        return;
    }

    const templates = [
        'PSB', // must be fist in list
        'BFKO',
        'RGSL',
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
        // add new legal entity here
    ];

    shuffle(templates);

    context.legalEntities = [];

    for (let i = 0; i < templates.length; i++) {
        const template = templates[i];
        const request = stepContext.requests[template];
        const result = await partyExecutor.createLegalEntity(request, undefined, stepContext.actor);
        context.legalEntities.push({
            template: template,
            Code: result.code,
            Id: result.id,
            legalEntityBody: request.body,
            fullName: request.body.partyOrganisationData.fullOrgName,
            shortName: request.body.partyOrganisationData.shortOrgName,
        });
        console.log("LegalEntity created: " + JSON.stringify({
            template: template,
            Code: result.code,
            Id: result.id,
        }));
    }
}

module.exports = {
    createLegalEntities,
};
