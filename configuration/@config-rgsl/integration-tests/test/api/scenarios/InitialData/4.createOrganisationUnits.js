const { shuffle } = require('@config-rgsl/infrastructure/lib/ArrayUtilsImpl');
const organisationUnitExecutor = require('../lib/organisationUnit/executor.js');

async function createOrganisationUnits(step, context, stepContext) {

    if (context.alreadyExecuted) {
        return;
    }

    const templates = [
        'BFKO',
        'RGSL',
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

    templates.push('PSB-VolgaBranch');
    templates.push('PSB-VolgaBranch-DOPuoltavski');

    context.organisationUnits = [];

    for (let i = 0; i < templates.length; i++) {
        const template = templates[i];

        let parent;
        const parentTemplate = template.split('-');
        if (parentTemplate.length > 1) {
            parentTemplate.pop();
            const resultTemplate = parentTemplate.join('-');
            parent = context.organisationUnits.find(obj => obj.template === resultTemplate);
        }

        const partner = context.partners.find(obj => obj.template === template);

        const request = stepContext.requests[template];
        request.body.parentName = parent && parent.name;
        request.body.parentCode = parent && parent.Code;
        request.body.partnerName = partner && partner.partnerName;
        request.body.partnerCode = partner && partner.Code;

        const result = await organisationUnitExecutor.createOrganisationUnit(request, parent && parent.Id, stepContext.actor);
        context.organisationUnits.push({
            template: template,
            Code: result.code,
            Id: result.id,
            name: request.body.name,
        });
        console.log("OrganisationUnit created: " + JSON.stringify({
            template: template,
            Code: result.code,
            Id: result.id,
        }));
    }
}

module.exports = {
    createOrganisationUnits,
};
