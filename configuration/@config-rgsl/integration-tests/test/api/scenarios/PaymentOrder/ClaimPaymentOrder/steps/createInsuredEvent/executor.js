const { VersionedDocumentBuilderRgsl } = require('../../../../lib/common/testBuilderExtension');
const chai = require('chai');

async function executor(step, context, stepContext) {

    const body = stepContext.requests['body'];

    const result = await createInsuredEvent(body, stepContext.actor);

    context.insuredEventId = result.id;
    context.insuredEventNumber = result.number;
    context.insuredEventBody = result.body;
}

async function createInsuredEvent(body, actor) {

    const builder = new VersionedDocumentBuilderRgsl('InsuredEvent');
    const document = await builder
        .setExample({ body })
        .setActor(actor)
        .create()
        .makeTransition('DraftToConfirmed', 'Confirmed')
        .build();

    return {
        id: document.id,
        number: document.documentNumber,
        body: document.body,
    };
}

module.exports = {
    executor,
};
