const partyExecutor = require('../lib/party/executor.js');
const attachmentHelpers = require('../lib/common/attachmentHelpers');
const { shuffle } = require('@config-rgsl/infrastructure/lib/ArrayUtilsImpl');

async function createNaturalPersons(step, context, stepContext) {

    if (context.alreadyExecuted) {
        return;
    }

    const attachments = attachmentHelpers.getAttachments();

    const templates = [
        {
            name: 'Administrator'
        },
        {
            name: 'Saler.PSB.MASS'
        },
        {
            name: 'Saler.PSB.Afflyent'
        },
        {
            name: 'OPERU'
        },
        {
            name: 'Underwriter'
        },
        {
            name: 'BFKOinitiator'
        },
        {
            name: 'Saler.Demo'
        },
        {
            name: 'AKCEPTinitiator'
        },
        {
            name: 'AKBARSinitiator'
        },
        {
            name: 'ZENITinitiator'
        },
        {
            name: 'BFKOAUTOinitiator'
        },
        {
            name: 'PSBVIPinitiator'
        },
        {
            name: 'OASinitiator'
        },
        {
            name: 'MINBANKinitiator'
        },
        {
            name: 'SMPinitiator'
        },
        {
            name: 'SOVKOMBANKinitiator'
        },
        {
            name: 'ROSBANKinitiator'
        },
        {
            name: 'REINVESTinitiator'
        },
        {
            name: 'LIFEINVESTinitiator'
        },
        {
            name: 'VTBinitiator'
        },
        {
            name: 'VTBMASSinitiator'
        },
        {
            name: 'POCHTABANKinitiator'
        },
        {
            name: 'PolicyHolder',
            attachmentNames: [
                'passport',
                'financialQuestionary',
            ],
        },
        {
            name: 'UBRRMASSinitiator'
        },
    ];

    shuffle(templates);

    context.naturalPersons = [];

    for (let i = 0; i < templates.length; i++) {
        const templateData = templates[i];
        const request = stepContext.requests[templateData.name];

        let attachmentRequests = undefined;
        if (templateData.attachmentNames) {
            attachmentRequests = [];
            for (const attachmentName of templateData.attachmentNames) {
                attachmentRequests.push(attachments[attachmentName]);
            }
        }

        const result = await partyExecutor.createNaturalPerson(request, attachmentRequests, stepContext.actor);
        context.naturalPersons.push({
            template: templateData.name,
            Code: result.code,
            Id: result.id,
            fullName: request.body.partyPersonData.firstName + ' ' + request.body.partyPersonData.lastName,
            naturalPersonBody: request.body,
        });

        console.log("NaturalPerson created: " + JSON.stringify({
            template: templateData.name,
            Code: result.code,
            Id: result.id,
        }));
    }
}

module.exports = {
    createNaturalPersons,
};
