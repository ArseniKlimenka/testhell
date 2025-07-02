const partyExecutor = require('../../lib/party/executor.js');
const { generateUniquePersonData, updatePartyBody } = require('../../lib/party/partyGenerationHelper.js');
const attachmentHelpers = require('../../lib/common/attachmentHelpers.js');
const { shuffle } = require('@config-rgsl/infrastructure/lib/ArrayUtilsImpl');

async function createUniqueNaturalPerson(step, context, stepContext) {

    if (context.alreadyExecuted) {
        return;
    }

    const attachments = attachmentHelpers.getAttachments();

    const templates = [
        {
            name: 'UniqueNaturalPerson',
            attachmentNames: [
                'passport',
                'financialQuestionary',
            ],
        },
    ];

    shuffle(templates);

    context.naturalPersons = [];

    for (let i = 0; i < templates.length; i++) {
        const templateData = templates[i];
        const request = stepContext.requests[templateData.name];
        const partyBody = request.body;
        const uniquePersonData = generateUniquePersonData();
        updatePartyBody(partyBody, uniquePersonData);

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

        console.log("Unique NaturalPerson created: " + JSON.stringify({
            template: templateData.name,
            Code: result.code,
            Id: result.id,
        }));
    }
}

module.exports = {
    createUniqueNaturalPerson,
};
