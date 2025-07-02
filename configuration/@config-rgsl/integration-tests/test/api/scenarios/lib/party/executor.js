const { MasterEntityBuilder } = require('@adinsure-tools/api-test-framework');
const chai = require('chai');
const expect = chai.expect;

async function create(configurationName, example, attachmentRequests, actor) {

    const builder = new MasterEntityBuilder(configurationName);
    builder
        .setActor(actor)
        .setExample(example)
        .create()
        .retryValidateDataSource(
            'GetPartyInfoDataSource',
            context => ({
                paging: undefined,
                criteria : { partyCode: context.code },
            }),
            (result, context) => {
                expect(result.data.length, 'Party ASS was not populated!').to.be.equals(1);
                const party = result.data[0].resultData;
                expect(party.partyCode, 'PartyCode is invalid!').to.be.equals(context.code);
            }
        );

    if (attachmentRequests) {
        for (const attachmentRequest of attachmentRequests) {
            builder.uploadAttachment(attachmentRequest);
        }
    }

    const data = await builder.build();

    const result = {
        id: data.id,
        code: data.code,
    };
    return result;
}

async function createLegalEntity(request, attachmentRequests, actor) {
    return await create('LegalEntity', request, attachmentRequests, actor);
}

async function createNaturalPerson(request, attachmentRequests, actor) {
    return await create('NaturalPerson', request, attachmentRequests, actor);
}

async function createSoleProprietor(request, attachmentRequests, actor) {
    return await create('SoleProprietor', request, attachmentRequests, actor);
}

module.exports = {
    createLegalEntity,
    createNaturalPerson,
    createSoleProprietor,
};
