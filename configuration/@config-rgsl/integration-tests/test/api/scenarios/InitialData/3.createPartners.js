const { shuffle } = require('@config-rgsl/infrastructure/lib/ArrayUtilsImpl');
const serviceProviderExecutor = require('../lib/serviceProvider/executor.js');

async function createPartners(step, context, stepContext) {

    if (context.alreadyExecuted) {
        return;
    }

    const templates = [
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
        'PSB',
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

    context.partners = [];

    for (let i = 0; i < templates.length; i++) {
        const template = templates[i];
        const legalEntity = context.legalEntities.find(obj => obj.template === template);

        const request = stepContext.requests[template];
        request.body.partyId = legalEntity.Id;
        request.body.partyCode = legalEntity.Code;
        request.body.partyDisplayName = legalEntity.fullName;
        request.body.partyShortName = legalEntity.shortName;

        const result = await serviceProviderExecutor.createPartner(request, stepContext.actor);
        context.partners.push({
            template: template,
            Code: result.code,
            Id: result.id,
            partyCode: request.body.partyCode,
            partnerName: request.body.partyDisplayName,
        });
        console.log("Partner created: " + JSON.stringify({
            template: template,
            Code: result.code,
            Id: result.id,
        }));
    }
}

module.exports = {
    createPartners,
};
