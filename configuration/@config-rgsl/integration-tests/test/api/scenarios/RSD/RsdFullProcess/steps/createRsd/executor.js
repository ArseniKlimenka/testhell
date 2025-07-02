const { VersionedDocumentBuilderRgsl } = require('../../../../lib/common/testBuilderExtension');
const { parseEtag } = require('../../../../lib/common/etagLib');
const chai = require('chai');
const expect = chai.expect;

async function executor(step, context, stepContext) {

    const body = {
        createdDate: '2023-07-01',
    };

    const result = await createRSD(body, stepContext.actor);

    context.rsdId = result.id;
    context.rsdNumber = result.number;
    context.rsdBody = result.body;
}

async function createRSD(body, actor) {

    const builder = new VersionedDocumentBuilderRgsl('RSD');
    const document = await builder
        .setExample({ body })
        .setActor(actor)
        .create()
        .retryValidateDataSource(
            'GetRsdDocumentDataSource',
            context => ({
                paging: undefined,
                criteria: { rsdNumber: context.documentNumber },
            }),
            (result, context) => {
                expect(result.data.length, 'Item was not found!').to.be.equal(1);
            },
        )
        .build();

    const documentId = parseEtag(document.etag).id;
    return {
        id: documentId,
        number: document.documentNumber,
        body: document.body,
    };
}

module.exports = {
    executor,
};
